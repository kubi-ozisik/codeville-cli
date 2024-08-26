export const nodeExpressSetup = `
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3001;

app.use(express.json());

app.post('/api/openai-completion', async (req, res) => {
  try {
    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: req.body.prompt,
      max_tokens: 100
    }, {
      headers: {
        'Authorization': \`Bearer \${process.env.OPENAI_API_KEY}\`,
        'Content-Type': 'application/json'
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(\`Backend API listening at http://localhost:\${port}\`);
});
`;

export const nodeHonoSetup = `
import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import axios from 'axios';

const app = new Hono();

app.post('/api/openai-completion', async (c) => {
  const { prompt } = await c.req.json();
  try {
    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt,
      max_tokens: 100
    }, {
      headers: {
        'Authorization': \`Bearer \${process.env.OPENAI_API_KEY}\`,
        'Content-Type': 'application/json'
      }
    });
    return c.json(response.data);
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

serve(app, (info) => {
  console.log(\`Backend API listening at http://localhost:\${info.port}\`);
});
`;

export const pythonFlaskSetup = `
from flask import Flask, request, jsonify
import requests
import os

app = Flask(__name__)

@app.route('/api/openai-completion', methods=['POST'])
def openai_completion():
    data = request.json
    headers = {
        'Authorization': f"Bearer {os.environ.get('OPENAI_API_KEY')}",
        'Content-Type': 'application/json'
    }
    response = requests.post('https://api.openai.com/v1/engines/davinci-codex/completions', 
                             json={'prompt': data['prompt'], 'max_tokens': 100}, 
                             headers=headers)
    return jsonify(response.json())

if __name__ == '__main__':
    app.run(port=3001)
`;

export const pythonFastAPISetup = `
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import httpx
import os

app = FastAPI()

class Prompt(BaseModel):
    prompt: str

@app.post("/api/openai-completion")
async def openai_completion(prompt: Prompt):
    headers = {
        'Authorization': f"Bearer {os.environ.get('OPENAI_API_KEY')}",
        'Content-Type': 'application/json'
    }
    async with httpx.AsyncClient() as client:
        response = await client.post('https://api.openai.com/v1/engines/davinci-codex/completions', 
                                     json={'prompt': prompt.prompt, 'max_tokens': 100}, 
                                     headers=headers)
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.text)
    return response.json()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3001)
`;
