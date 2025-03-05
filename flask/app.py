from flask import Flask, render_template, request, jsonify
import google.generativeai as genai
from google.api_core import retry
import time
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
genai.configure(api_key="AIzaSyBi4ChLmvFz_6qh-OrnLh0HtBF1aU1HWUc")

# Initialize the AI model (ensure 'gemini-1.5-flash-latest' is available)
model = genai.GenerativeModel(
    'gemini-1.5-flash-latest',
    generation_config=genai.GenerationConfig(
        temperature=0.1,
        top_p=1,
        max_output_tokens=1024,
    )
)

@app.route('/')
def home():
    return "Hello from Flask on Vercel!"


@app.route('/generate_code', methods=['POST'])
def generate_code():
    # Parse JSON data from the request body
    data = request.get_json()
    if not data or 'code_prompt' not in data:
        return jsonify({"error": "Invalid JSON data. 'code_prompt' is required."}), 400

    code_prompt = "you are excelent in coding . Your task is to send response based on given code and prompt and send the code making important portion bold or highlighted . Don't send any other any comments except the correct code ." + data['code_prompt']

    # Start the timer to measure response time
    st = time.time()

    # Define retry policy (You can adjust this part as needed)
    retry_policy = {
        "retry": retry.Retry(predicate=retry.if_transient_error, initial=10, multiplier=1.5, timeout=300)
    }

    try:
        # Generate code from AI model
        response = model.generate_content(code_prompt, request_options=retry_policy)
        code_output = response.text
        response_time = time.time() - st
        
        print(code_output)
        # Return the generated code and response time
        return jsonify({"generated_code": code_output, "response_time": response_time})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

if __name__ == '__main__':
    app.run(debug=True)