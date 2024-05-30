import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.plugins.contentnegotiation.*

import io.ktor.serialization.gson.*

import kotlinx.coroutines.*
import java.util.*

data class Data(val content: String)

fun main() {
    runBlocking {
        val client = HttpClient(CIO) {
            install(ContentNegotiation) {
                gson()
            }
        }

        val scanner = Scanner(System.`in`)
        var message = ""
        while (true) {
            print("Podaj wiadomość do wysłania: ")
            message = scanner.nextLine()
            val response: HttpResponse = client.post("https://discord.com/api/v10/channels/1226077021747154978/messages") {
                headers {
                    append(HttpHeaders.Authorization, "Bot KOD")
                }
                contentType(ContentType.Application.Json)
                setBody(Data(message))
            }

        }
        client.close()
    }
}