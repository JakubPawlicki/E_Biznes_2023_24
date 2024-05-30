import dev.kord.common.entity.Snowflake
import dev.kord.core.Kord
import dev.kord.core.behavior.interaction.response.respond
import dev.kord.core.entity.channel.MessageChannel
import dev.kord.core.event.interaction.ChatInputCommandInteractionCreateEvent
import dev.kord.core.event.interaction.GlobalChatInputCommandInteractionCreateEvent
import dev.kord.core.event.interaction.GuildChatInputCommandInteractionCreateEvent
import dev.kord.core.event.message.MessageCreateEvent
import dev.kord.core.on
import dev.kord.gateway.Intent
import dev.kord.gateway.PrivilegedIntent
import dev.kord.rest.builder.interaction.string
import java.util.*


suspend fun main() {
    val token = ""
    val kord = Kord(token)

    val channelId = Snowflake(1226126038669463603)
    val channel = kord.getChannelOf<MessageChannel>(channelId)

    val mapa = mapOf<String, List<String>>(
        "Kategoria A" to listOf("Produkt A1", "Produkt A2", "Produkt A3"),
        "Kategoria B" to listOf("Produkt B1", "Produkt B2"),
        "Kategoria C" to listOf("Produkt C1")
    )

    kord.createGlobalChatInputCommand("categories", "Returns list of categories")
    kord.createGlobalChatInputCommand("products", "Returns list of products in given category") {
        string("category", "Category name") {
            required = true
            for (key in mapa.keys) {
                choice(key, key)
            }
        }
    }

    kord.on<MessageCreateEvent> {
        println(message.content)
    }

    kord.on<ChatInputCommandInteractionCreateEvent> {
        val response = interaction.deferPublicResponse()
        val command = interaction.command
        println(command.rootName)
        if (command.rootName.equals("categories")) {
            response.respond {
                content = mapa.keys.toString()
            }
        }
        else if (command.rootName.equals("products")) {
                response.respond {
                    content = mapa[command.strings["category"]!!].toString()
                }
            }
        }

    kord.login {
        @OptIn(PrivilegedIntent::class)
        intents += Intent.MessageContent
    }

    kord.login()

}