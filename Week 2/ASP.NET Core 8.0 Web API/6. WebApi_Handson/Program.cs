// ===========================================================================
// Exercise 6 - Kafka Chat Application (console)
//
// A small chat app that uses Apache Kafka as the streaming backbone. Every
// participant runs this program; messages typed by one client are published to
// a Kafka topic and consumed (and printed) by all the others - exactly the
// "consume the chat messages in the command prompt" requirement.
//
// Modes (pass as the first argument):
//   chat      (default) - run a producer AND a consumer together = full chat
//   produce             - only send messages (the "publisher in command prompt")
//   consume             - only receive/print messages (the "client application")
//
// Usage examples:
//   dotnet run -- chat Alice
//   dotnet run -- produce Alice
//   dotnet run -- consume
// ===========================================================================

using Confluent.Kafka;

const string BootstrapServers = "localhost:9092";
const string Topic = "chat-messages";

// --- parse arguments -------------------------------------------------------
var mode = args.Length > 0 ? args[0].ToLowerInvariant() : "chat";
var userName = args.Length > 1
    ? args[1]
    : PromptUserName();

// Ctrl+C cancels cleanly instead of killing the process abruptly.
using var cts = new CancellationTokenSource();
Console.CancelKeyPress += (_, e) =>
{
    e.Cancel = true;
    cts.Cancel();
};

Console.WriteLine($"Kafka chat | broker: {BootstrapServers} | topic: {Topic} | mode: {mode}");
Console.WriteLine("-----------------------------------------------------------------");

switch (mode)
{
    case "produce":
        await RunProducerLoop(userName, cts.Token);
        break;

    case "consume":
        RunConsumerLoop(cts.Token);
        break;

    case "chat":
    default:
        // Consumer runs in the background; the foreground reads what you type.
        var consumerTask = Task.Run(() => RunConsumerLoop(cts.Token), cts.Token);
        await RunProducerLoop(userName, cts.Token);
        cts.Cancel();
        await Task.WhenAny(consumerTask, Task.Delay(1000));
        break;
}

Console.WriteLine("Chat closed. Bye!");
return;

// ---------------------------------------------------------------------------
// Producer: reads lines from the console and publishes them to the topic.
// The Kafka message KEY is the user name (so a partitioned topic keeps one
// user's messages in order); the VALUE is "user: text".
// ---------------------------------------------------------------------------
async Task RunProducerLoop(string user, CancellationToken token)
{
    var config = new ProducerConfig { BootstrapServers = BootstrapServers };
    using var producer = new ProducerBuilder<string, string>(config).Build();

    Console.WriteLine($"[{user}] type a message and press Enter. Type '/exit' to quit.\n");

    while (!token.IsCancellationRequested)
    {
        var text = Console.ReadLine();
        if (text is null || text.Equals("/exit", StringComparison.OrdinalIgnoreCase))
            break;

        if (string.IsNullOrWhiteSpace(text))
            continue;

        var payload = $"{user}: {text}";
        try
        {
            var result = await producer.ProduceAsync(
                Topic,
                new Message<string, string> { Key = user, Value = payload },
                token);

            // Small confirmation of the partition/offset the broker assigned.
            Console.WriteLine($"  (delivered to {result.TopicPartitionOffset})");
        }
        catch (ProduceException<string, string> ex)
        {
            Console.WriteLine($"  ! delivery failed: {ex.Error.Reason}");
        }
        catch (OperationCanceledException)
        {
            break;
        }
    }

    // Wait up to 5s for any in-flight messages to be delivered.
    producer.Flush(TimeSpan.FromSeconds(5));
}

// ---------------------------------------------------------------------------
// Consumer: subscribes to the topic and prints every message as it arrives.
// A UNIQUE group id per process means every client receives EVERY message
// (broadcast), which is what you want for a chat room.
// ---------------------------------------------------------------------------
void RunConsumerLoop(CancellationToken token)
{
    var config = new ConsumerConfig
    {
        BootstrapServers = BootstrapServers,
        GroupId = $"chat-{Guid.NewGuid()}",     // unique => receives all messages
        AutoOffsetReset = AutoOffsetReset.Latest // only new messages
    };

    using var consumer = new ConsumerBuilder<string, string>(config).Build();
    consumer.Subscribe(Topic);

    try
    {
        while (!token.IsCancellationRequested)
        {
            try
            {
                var cr = consumer.Consume(token);
                if (cr?.Message is not null)
                    Console.WriteLine($"\r{cr.Message.Value}");
            }
            catch (ConsumeException ex)
            {
                Console.WriteLine($"  ! consume error: {ex.Error.Reason}");
            }
        }
    }
    catch (OperationCanceledException)
    {
        // graceful shutdown
    }
    finally
    {
        consumer.Close();
    }
}

// ---------------------------------------------------------------------------
static string PromptUserName()
{
    Console.Write("Enter your chat name: ");
    var name = Console.ReadLine();
    return string.IsNullOrWhiteSpace(name) ? $"user{Random.Shared.Next(1000, 9999)}" : name.Trim();
}
