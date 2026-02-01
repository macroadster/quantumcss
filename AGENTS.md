# AI Agent Working Guide - Project Starlight

**You are working in an isolated sandbox environment for Project Starlight.**

## 🚀 **Your Current Context**

### Project Overview
**Project Starlight** is an open-source protocol to build and train AI models for detecting steganography in images stored on blockchains like Bitcoin.

- **Primary Goal**: Safeguard integrity of digital history stored on-chain
- **Long-Term Vision (2142)**: Automate covert data detection for "AI common sense"
- **Your Mission**: Complete assigned tasks efficiently and securely

### Your Current Location
```bash
/data/uploads/results/[visible_pixel_hash]/
```
This is your isolated workspace where you should:
- Write all code and files
- Store your work output
- Test implementations
- Create deliverables

## 🛡️ **Security & Constraints**

### ✅ **Allowed Operations**
```python
# Safe imports you can use
import json, math, base64, hashlib, datetime, re, string
import itertools, collections, dataclasses, html, urllib.parse
from typing import Dict, List, Optional, Any, Union

# Safe operations
math.sqrt(16)                    # Math operations
json.loads(data)                 # JSON parsing
base64.b64encode(data)          # Encoding
hashlib.sha256(data).hexdigest() # Hashing
datetime.datetime.now()           # Timestamps
re.findall(pattern, text)        # Regex
html.escape(text)               # HTML escaping for security
urllib.parse.quote(text)         # URL encoding
```

### 🌐 **Web Content Generation Capabilities**
```python
# HTML generation (safe)
html_template = """
<!DOCTYPE html>
<html>
<head><title>{title}</title></head>
<body>{content}</body>
</html>
"""

# CSS generation (safe)
css_styles = """
.container {{
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}}
"""

# JavaScript generation (safe)
js_code = """
function analyzeData(data) {
    return data.filter(item => item.confidence > 0.8);
}
"""

# Chart.js data structures
chart_data = {
    "type": "bar",
    "data": {
        "labels": ["Clean", "Stego"],
        "datasets": [{"label": "Accuracy", "data": [95, 82]}]
    }
}
```

### ❌ **Blocked Operations**
```python
# These will be blocked by security validation
open()                          # File access
subprocess.run()                 # System commands  
socket.socket()                 # Network access
requests.get()                  # HTTP requests
eval() / exec()                 # Code execution
import os, sys, subprocess       # System imports
import requests, urllib, socket   # Network imports
```

### 🔒 **Isolation Rules**
- **Working Directory**: Limited to your sandbox only
- **File Access**: Cannot access files outside sandbox
- **Network**: No external network access
- **Execution**: Only allowed imports and operations

## 📁 **Project Structure Reference**

### Key Files (for context)
```bash
scanner.py                    # Main steganography detection tool
diag.py                      # Dataset integrity verification
trainer.py                    # Model training
datasets/[name]_submission_[year]/  # Dataset contributions
models/                       # Trained models
```

### Core Commands (for context)
```bash
# Dataset generation
cd datasets/<contributor>
python3 data_generator.py --limit 10

# Verify data integrity  
python3 diag.py

# Run detection
python3 scanner.py /path/to/image.png --json
```

## 🎯 **Your Task Workflow**

### 1. **Understand Your Assignment**
You'll receive a task description like:
```
TASK: Complete this work efficiently and provide concrete results.

REQUIREMENTS:
1. Provide specific implementation details
2. Include actual code examples or execution steps  
3. Show evidence of completion
4. Keep response concise and actionable
```

### 2. **Implementation Pattern**
```python
def solve_task(task_input):
    """
    Skill: Task-specific implementation
    Type: [analysis/processing/integration]
    Version: 1.0
    Author: [your_identifier]
    
    Args:
        task_input: Task parameters and context
        
    Returns:
        dict: Structured result with implementation
    """
    try:
        # Your solution logic here
        result = implement_solution(task_input)
        
        return {
            "success": True,
            "result": result,
            "error": None,
            "metadata": {
                "task_completed": True,
                "implementation_type": "direct",
                "completion_time": datetime.datetime.now().isoformat()
            }
        }
    except Exception as e:
        return {
            "success": False, 
            "result": None,
            "error": str(e),
            "metadata": {"task_completed": False}
        }
```

### 3. **Required Deliverables**
Always include:
- **Implementation details**: Code, logic, approach
- **Evidence of completion**: Test results, outputs, verification
- **Working files**: Any code created in your sandbox
- **Summary**: Clear status and results
- **Web content** (when applicable): HTML files, interactive demos, visualizations
- **Documentation**: README files, usage guides, API documentation

## 🧪 **Testing & Verification**

### Local Testing
```python
def test_implementation():
    """Test your work before submission."""
    test_cases = [
        {"input": "test1", "expected": "result1"},
        {"input": "test2", "expected": "result2"}
    ]
    
    for case in test_cases:
        result = solve_task(case["input"])
        if result["success"]:
            print(f"✅ Test passed: {case['input']}")
        else:
            print(f"❌ Test failed: {result['error']}")
    
    return True

if __name__ == "__main__":
    test_implementation()
```

### Verification Checklist
- [ ] Code runs without errors
- [ ] Security constraints respected
- [ ] All deliverables present
- [ ] Clear documentation provided
- [ ] Evidence of completion

## 📝 **Common Task Types**

### Type 1: Analysis Tasks
```python
def analyze_data(data):
    """Analyze steganography patterns in image data."""
    patterns_found = []
    
    # Pattern detection logic
    if detect_anomalies(data):
        patterns_found.append("anomaly_detected")
    
    return {
        "analysis_complete": True,
        "patterns_found": patterns_found,
        "confidence": 0.85
}
```

### Type 2: Processing Tasks  
```python
def process_dataset(raw_data):
    """Process and normalize dataset."""
    processed = []
    
    for item in raw_data:
        normalized = normalize_item(item)
        processed.append(normalized)
    
    return {
        "processed_items": len(processed),
        "data": processed,
        "processing_complete": True
    }
```

### Type 3: Implementation Tasks
```python
def implement_feature(requirements):
    """Implement new feature based on requirements."""
    
    # Code implementation
    feature_code = write_feature_code(requirements)
    
    # Test implementation
    test_results = test_feature(feature_code)
    
    return {
        "feature_implemented": True,
        "code_files": feature_code,
        "test_passed": test_results["success"],
        "implementation": feature_code
    }
```

### Type 4: Web Content Generation Tasks
```python
def create_blog_post(title, content, data=None):
    """Generate an interactive blog post with charts and visualizations."""
    html_content = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>{title}</title>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <style>
            body {{ font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }}
            .chart-container {{ margin: 20px 0; }}
            .interactive-demo {{ border: 1px solid #ddd; padding: 20px; margin: 20px 0; }}
        </style>
    </head>
    <body>
        <h1>{title}</h1>
        {content}
        <div class="chart-container">
            <canvas id="dataChart"></canvas>
        </div>
        <script>
            // Interactive chart generation
            const ctx = document.getElementById('dataChart').getContext('2d');
            const myChart = new Chart(ctx, {{
                type: 'bar',
                data: {data},
                options: {{
                    responsive: true,
                    plugins: {{
                        title: {{
                            display: true,
                            text: 'Steganography Detection Results'
                        }}
                    }}
                }}
            }});
        </script>
    </body>
    </html>
    """
    
    return {
        "content_generated": True,
        "format": "html",
        "file_path": "blog_post.html",
        "html_content": html_content,
        "interactive_elements": ["chart", "responsive_design"]
    }
```

### Type 5: Research Paper with Visualizations
```python
def create_research_paper(title, sections, data_visualizations):
    """Create a research paper with embedded charts and graphs."""
    paper_html = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>{title}</title>
        <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
        <style>
            .paper {{ font-family: 'Times New Roman', serif; line-height: 1.6; }}
            .abstract {{ background: #f4f4f4; padding: 15px; margin: 20px 0; }}
            .figure {{ margin: 20px 0; text-align: center; }}
            .methodology {{ background: #e8f4fd; padding: 15px; }}
        </style>
    </head>
    <body class="paper">
        <h1>{title}</h1>
        <div class="abstract">
            <h2>Abstract</h2>
            <p>Analysis of steganography detection patterns using advanced ML techniques.</p>
        </div>
        
        {sections}
        
        <div class="figure">
            <div id="plotly-chart"></div>
            <p>Figure 1: Detection accuracy across different algorithms</p>
        </div>
        
        <script>
            const data = {data_visualizations};
            Plotly.newPlot('plotly-chart', data, {{title: 'Steganography Detection Performance'}});
        </script>
    </body>
    </html>
    """
    
    return {
        "paper_generated": True,
        "format": "html_research_paper",
        "includes_visualizations": True,
        "file_path": "research_paper.html",
        "html_content": paper_html
    }
```

### Type 6: Interactive Web Demo
```python
def create_interactive_demo(title, functionality):
    """Create interactive web demonstrations or games."""
    demo_html = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>{title}</title>
        <style>
            .demo-container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .control-panel {{ background: #f0f0f0; padding: 15px; margin: 10px 0; }}
            .result-display {{ background: #e8f5e8; padding: 10px; min-height: 50px; }}
        </style>
    </head>
    <body>
        <div class="demo-container">
            <h1>{title}</h1>
            <div class="control-panel">
                <input type="file" id="imageUpload" accept="image/*">
                <button onclick="analyzeImage()">Analyze for Steganography</button>
            </div>
            <div class="result-display" id="results">
                Results will appear here...
            </div>
        </div>
        
        <script>
            function analyzeImage() {{
                const file = document.getElementById('imageUpload').files[0];
                if (file) {{
                    // Simulate steganography analysis
                    const result = Math.random() > 0.5 ? 
                        "Steganography detected with 85% confidence" : 
                        "No steganography detected";
                    document.getElementById('results').innerHTML = result;
                }}
            }}
        </script>
    </body>
    </html>
    """
    
    return {
        "demo_created": True,
        "format": "interactive_html",
        "interactivity_level": "high",
        "file_path": "interactive_demo.html",
        "html_content": demo_html
    }
```

### Type 7: Full-Stack Web App (Python Backend)
```python
def create_full_stack_app(title):
    """Create a web app with server-side Python logic."""
    
    # 1. Frontend (index.html) calling the backend
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <title>{title}</title>
        <script>
            async function callBackend() {{
                // The system automatically mounts api.py at this endpoint
                // Replace [HASH] with your visible_pixel_hash or contract ID
                const hash = window.location.pathname.split('/')[3] || 'unknown'; 
                const response = await fetch(`/api/function/${{hash}}/handler`);
                const data = await response.json();
                document.getElementById('result').innerText = data.message;
            }}
        </script>
    </head>
    <body>
        <h1>{title}</h1>
        <button onclick="callBackend()">Call Python Backend</button>
        <div id="result"></div>
    </body>
    </html>
    """
    
    # 2. Backend (api.py) - Safe Server-Side Logic
    api_code = """
def handler(request):
    \"\"\"
    Server-side handler for frontend requests.
    
    Args:
        request: FastAPI Request object (optional)
        
    Returns:
        dict: JSON response
    \"\"\"
    import math, datetime
    
    # Perform server-side calculation
    result = math.sqrt(1337)
    time = datetime.datetime.now().isoformat()
    
    return {
        "message": f"Server calculated {result:.2f} at {time}",
        "success": True
    }
"""
    
    return {
        "app_generated": True,
        "files": {
            "index.html": html_content,
            "api.py": api_code
        },
        "instructions": "System will auto-load api.py as a dynamic endpoint."
    }
```

## 📊 **Data Visualization & Chart Creation**

### Chart.js Integration
```python
def create_detection_chart(data):
    """Create interactive charts for steganography detection results."""
    return {
        "chart_type": "bar",
        "data": {
            "labels": ["Clean", "Alpha Stego", "LSB Stego", "DCT Stego"],
            "datasets": [{
                "label": "Detection Accuracy",
                "data": [99.2, 87.5, 92.1, 78.3],
                "backgroundColor": ["#4CAF50", "#FF9800", "#2196F3", "#F44336"]
            }]
        },
        "options": {
            "responsive": True,
            "plugins": {
                "title": {"display": True, "text": "Detection Performance by Method"}
            }
        }
    }
```

### Plotly Advanced Visualizations
```python
def create_performance_heatmap(accuracy_data):
    """Generate heatmap for model performance across different conditions."""
    return {
        "z": accuracy_data,
        "x": ["Image Size: 256", "512", "1024"],
        "y": ["Algorithm: LSB", "Alpha", "DCT", "F5"],
        "type": "heatmap",
        "colorscale": "Viridis"
    }
```

### D3.js Custom Visualizations
```python
def create_network_graph(nodes, edges):
    """Create interactive network graph of steganography patterns."""
    return {
        "nodes": [{"id": i, "label": node} for i, node in enumerate(nodes)],
        "links": [{"source": s, "target": t, "value": w} for s, t, w in edges],
        "layout": "force-directed"
    }
```

## 🌐 **Web Content Creation Templates**

### Blog Post Template
```python
def generate_blog_post_template():
    """Standard template for Starlight project blog posts."""
    return """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>{TITLE}</title>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
        <style>
            .hero { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                    color: white; padding: 4rem 2rem; text-align: center; }
            .content { max-width: 800px; margin: 0 auto; padding: 2rem; }
            .chart-container { margin: 2rem 0; }
            .code-block { background: #f4f4f4; padding: 1rem; border-radius: 5px; }
        </style>
    </head>
    <body>
        <section class="hero">
            <h1>{TITLE}</h1>
            <p>{SUBTITLE}</p>
        </section>
        <main class="content">
            {CONTENT}
            <div class="chart-container">
                <canvas id="mainChart"></canvas>
            </div>
        </main>
        <script>
            // Chart initialization
            const ctx = document.getElementById('mainChart').getContext('2d');
            new Chart(ctx, {CHART_CONFIG});
        </script>
    </body>
    </html>
    """
```

### Research Paper Template
```python
def generate_research_paper_template():
    """Template for academic-style research papers."""
    return """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>{TITLE} | Project Starlight Research</title>
        <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
        <style>
            .paper { font-family: 'Computer Modern', serif; max-width: 700px; margin: 0 auto; }
            .abstract { background: #f8f9fa; border-left: 4px solid #007bff; padding: 1rem; }
            .section { margin: 2rem 0; }
            .figure { text-align: center; margin: 1.5rem 0; }
            .equation { background: #f0f0f0; padding: 1rem; text-align: center; }
        </style>
    </head>
    <body class="paper">
        <header>
            <h1>{TITLE}</h1>
            <p><strong>Authors:</strong> {AUTHORS} | <strong>Date:</strong> {DATE}</p>
        </header>
        
        <section class="abstract">
            <h2>Abstract</h2>
            <p>{ABSTRACT}</p>
        </section>
        
        <section class="section">
            <h2>Introduction</h2>
            <p>{INTRODUCTION}</p>
        </section>
        
        <section class="section">
            <h2>Methodology</h2>
            <p>{METHODOLOGY}</p>
            <div class="equation">
                Accuracy = (TP + TN) / (TP + TN + FP + FN)
            </div>
        </section>
        
        <section class="section">
            <h2>Results</h2>
            <div class="figure">
                <div id="resultsChart"></div>
                <p><strong>Figure 1:</strong> {FIGURE_CAPTION}</p>
            </div>
        </section>
        
        <script>
            Plotly.newPlot('resultsChart', {PLOTLY_DATA}, {PLOTLY_LAYOUT});
        </script>
    </body>
    </html>
    """
```

## 🎮 **Interactive Web Demos & Games**

### Steganography Detection Game
```python
def create_detection_game():
    """Create an interactive game for testing steganography detection skills."""
    return """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <title>Steganography Detection Challenge</title>
        <style>
            .game-container { max-width: 800px; margin: 0 auto; padding: 20px; }
            .image-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin: 20px 0; }
            .image-card { border: 2px solid #ddd; padding: 10px; cursor: pointer; }
            .image-card:hover { border-color: #007bff; }
            .score { font-size: 24px; font-weight: bold; text-align: center; }
            .feedback { padding: 15px; margin: 10px 0; border-radius: 5px; }
        </style>
    </head>
    <body>
        <div class="game-container">
            <h1>🕵️ Steganography Detection Challenge</h1>
            <div class="score">Score: <span id="score">0</span>/10</div>
            <p>Click on images that contain hidden data!</p>
            
            <div class="image-grid" id="imageGrid">
                <!-- Images will be dynamically loaded -->
            </div>
            
            <div class="feedback" id="feedback" style="display:none;"></div>
        </div>
        
        <script>
            let score = 0;
            let round = 0;
            const maxRounds = 10;
            
            function loadImages() {{
                // Simulate loading mixed clean/stego images
                const grid = document.getElementById('imageGrid');
                grid.innerHTML = '';
                
                for (let i = 0; i < 6; i++) {{
                    const card = document.createElement('div');
                    card.className = 'image-card';
                    card.innerHTML = `<img src="placeholder_${{i}}.png" width="150"><p>Image ${{i+1}}</p>`;
                    card.onclick = () => checkAnswer(i, Math.random() > 0.5);
                    grid.appendChild(card);
                }}
            }}
            
            function checkAnswer(imageId, hasStego) {{
                const feedback = document.getElementById('feedback');
                if (hasStego) {{
                    score++;
                    feedback.textContent = "✅ Correct! You found hidden data!";
                    feedback.style.background = "#d4edda";
                }} else {{
                    feedback.textContent = "❌ Wrong! This image is clean.";
                    feedback.style.background = "#f8d7da";
                }}
                feedback.style.display = 'block';
                
                document.getElementById('score').textContent = score;
                
                setTimeout(() => {{
                    round++;
                    if (round < maxRounds) {{
                        loadImages();
                        feedback.style.display = 'none';
                    }} else {{
                        feedback.innerHTML = `<h2>🎯 Game Over!</h2><p>Final Score: ${{score}}/${{maxRounds}}</p>`;
                    }}
                }}, 2000);
            }}
            
            loadImages();
        </script>
    </body>
    </html>
    """
```

## 🔄 **Work Completion Process**

### When Your Work is Done:
1. **Final verification**: Test everything works
2. **Documentation**: Ensure all code is documented
3. **Submit**: Your work will be automatically collected
4. **Audit**: Watcher will verify your deliverables

### Submission Format
```python
{
    "notes": "# Task Report\n\n## Implementation\n[Your work description]\n\n## Results\n[Evidence of completion]",
    "result_file": "/uploads/results/[hash]/[task_id].md",
    "artifacts_dir": "/uploads/results/[hash]/", 
    "completion_proof": "unique-identifier",
    "web_content": {
        "blog_posts": ["blog_post.html"],
        "research_papers": ["research_paper.html"], 
        "interactive_demos": ["demo.html", "game.html"],
        "visualizations": ["chart_data.json"]
    }
}
```

### Enhanced Deliverable Options
- **HTML Files**: Blog posts, research papers, interactive demos
- **JSON Data**: Chart configurations, visualization data
- **Static Assets**: CSS styles, JavaScript functionality
- **Interactive Elements**: Web games, simulators, tools

## 🚨 **Important Reminders**

### Security First
- Never attempt file system access outside sandbox
- Use only allowed imports and operations
- Handle all exceptions gracefully

### Quality Standards  
- Provide working, testable solutions
- Include clear documentation
- Show evidence of completion
- Follow the specific task requirements

### Communication
- Be concise and technical
- Focus on implementation details
- Provide concrete evidence
- Avoid conversational filler

## 🆘 **Getting Help**

If you encounter issues:
1. **Check constraints**: Ensure you're not using blocked operations
2. **Review requirements**: Verify you're meeting all task criteria  
3. **Test locally**: Verify your code works before submission
4. **Document**: Clearly explain any challenges and solutions

---

**You are ready to work in your Starlight sandbox! Focus on secure, efficient implementation of your assigned tasks.**