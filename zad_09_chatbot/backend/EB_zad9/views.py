import random
import ollama

from django.http import JsonResponse
from django.views.decorators.http import require_http_methods


@require_http_methods(["GET"])
def get_opening(request):
    openings = [
        "Hello! How can I assist you today?",
        "Hi there! What can I help you with?",
        "Welcome! What brings you here?",
        "Greetings! How can I support you?",
        "Good day! What do you need help with?"
    ]
    return JsonResponse({"message": random.choice(openings)})


@require_http_methods(["GET"])
def get_ending(request):
    endings = [
        "Feel free to ask if you have any more questions!",
        "Let me know if there's anything else I can help you with.",
        "I'm here whenever you need assistance!",
        "Have a great day!",
        "Take care!"
    ]
    return JsonResponse({"message": random.choice(endings)})


@require_http_methods(["POST"])
def generate_answer(request):
    text_data = request.body.decode('utf-8')
    response = ollama.chat(model='gemma:2b', messages=[
        {
            'role': 'user',
            'content': text_data,
        },
    ])
    return JsonResponse({"answer": response['message']['content']})
