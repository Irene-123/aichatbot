from flask import Flask, request, jsonify, render_template
import openai
import configparser

app = Flask(__name__)

# Load API key from config.ini
def get_api_key():
    config = configparser.ConfigParser()
    config.read('config.ini')
    return config['Credentials']['API_KEY']

# Set OpenAI API key
openai.api_key = get_api_key()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    message = data['message']
    
    # Call ChatGPT API
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=message,
        max_tokens=100
    )

    return jsonify({'response': response.choices[0].text.strip()})

if __name__ == '__main__':
    app.run(debug=True)
