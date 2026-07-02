# Exercise 6 — Kafka Chat Application (C#)

> Project: `KafkaChat` (console) · Target framework: **.NET 8** · Package: `Confluent.Kafka`

A chat application that uses **Apache Kafka** as the streaming platform. Each
participant runs the console app; a message typed by one client is published to
a Kafka topic and consumed/printed by all the others — i.e. you "consume the
chat messages in the command prompt".

---

## Kafka in a nutshell

- **Kafka** is a distributed, append-only **commit log / streaming platform**.
  Producers publish records; consumers read them. Records are retained for a
  configurable time, so consumers can read at their own pace.
- **Topic** — a named stream of records (here: `chat-messages`).
- **Partition** — a topic is split into partitions for scale and ordering.
  Order is guaranteed *within* a partition. Records with the same **key** go to
  the same partition (we use the user name as the key).
- **Broker** — a Kafka server. A **cluster** is several brokers; partitions are
  spread/replicated across them for scale and fault-tolerance.
- **Consumer group** — consumers sharing a `group.id` split the partitions
  between them. To make chat a **broadcast** (everyone sees everything) each
  client uses a *unique* group id, so it gets its own copy of every message.
- **Zookeeper** — in classic Kafka it stores cluster metadata and handles broker
  coordination/leader election. (Newer Kafka can run "KRaft" mode without
  Zookeeper, but the Windows quick-start below still uses Zookeeper.)

### Architecture of this app
```
  [You: KafkaChat "Alice"]            [Friend: KafkaChat "Bob"]
        | produce                            | produce
        v                                    v
  +------------------------------------------------------+
  |                Kafka broker (localhost:9092)         |
  |                 topic: chat-messages                 |
  +------------------------------------------------------+
        ^                                    ^
        | consume (group chat-<guid-A>)      | consume (group chat-<guid-B>)
   prints Bob's lines                   prints Alice's lines
```
Each running instance is BOTH a producer (your keystrokes) and a consumer
(everyone's messages) — see [`Program.cs`](./Program.cs).

---

## Installing & running Kafka on Windows

1. Install a **JDK** (Kafka needs Java) and set `JAVA_HOME`.
2. Download Kafka from <https://kafka.apache.org/downloads> and unzip, e.g. to
   `C:\kafka`.
3. Open two command prompts in `C:\kafka`.

   **Start Zookeeper:**
   ```bat
   .\bin\windows\zookeeper-server-start.bat .\config\zookeeper.properties
   ```
   **Start the Kafka broker** (second prompt):
   ```bat
   .\bin\windows\kafka-server-start.bat .\config\server.properties
   ```
4. **Create the topic** (third prompt):
   ```bat
   .\bin\windows\kafka-topics.bat --create --topic chat-messages ^
       --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
   ```

> Tip — paths on the bat files can be relative as the demo shows, e.g.
> `kafka-server-start.bat ../../config/server.properties` depending on the
> folder you launch from.

## Running the chat

From this folder (with the broker running):

```bash
# Terminal 1 - Alice (full chat: sends + receives)
dotnet run -- chat Alice

# Terminal 2 - Bob
dotnet run -- chat Bob
```

Type in either window and the line appears in the other. Type `/exit` to quit.

You can also split the two roles, matching the "publisher in command prompt" +
"client application" pictures in the exercise:

```bash
dotnet run -- produce Alice     # only sends   (the publisher)
dotnet run -- consume           # only receives (the client / subscriber)
```

## Part 2 — Windows Forms client

The second hands-on asks for a **C# Windows Forms** chat client. The Kafka logic
is identical to this console app — only the I/O changes:

- Build a WinForms app (`net8.0-windows`, `<UseWindowsForms>true</UseWindowsForms>`).
- A `TextBox` + **Send** button calls the same `producer.ProduceAsync(...)`.
- A background consumer loop (as in `RunConsumerLoop`) appends each received
  message to a `ListBox`/`RichTextBox`. Use `control.Invoke(...)` to update the
  UI from the consumer thread.

Running the WinForms client and the console consumer side by side demonstrates
the message being consumed in *different* client applications.

## Reference
- https://www.c-sharpcorner.com/article/apache-kafka-net-application/
- https://www.c-sharpcorner.com/article/step-by-step-installation-and-configuration-guide-of-apache-kafka-on-windows-ope/
