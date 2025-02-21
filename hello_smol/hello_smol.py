#!/usr/bin/env python


# https://huggingface.co/HuggingFaceTB/SmolLM2-1.7B-Instruct

from transformers import AutoModelForCausalLM, AutoTokenizer

#checkpoint = "HuggingFaceTB/SmolLM2-1.7B-Instruct"
checkpoint="HuggingFaceTB/SmolLM2-135M-Instruct"


#device = "cuda" # for GPU usage or "cpu" for CPU usage
device = "cpu"

tokenizer = AutoTokenizer.from_pretrained(checkpoint)

# for multiple GPUs install accelerate and do `model = AutoModelForCausalLM.from_pretrained(checkpoint, device_map="auto")`
model = AutoModelForCausalLM.from_pretrained(checkpoint).to(device)


#messages = [{"role": "user", "content": "What is the capital of France."}]
#messages = [{"role": "user", "content": "Write a 100-word article on 'Benefits of Open-Source in AI research"}]
messages = [{"role": "user", "content": "Q: what is the meaning of life? A: "}]


input_text=tokenizer.apply_chat_template(messages, tokenize=False)
inputs = tokenizer.encode(input_text, return_tensors="pt").to(device)


outputs = model.generate(inputs, 
                         max_new_tokens=500, temperature=0.2, 
                         top_p=0.9, do_sample=True)

print(tokenizer.decode(outputs[0]))

