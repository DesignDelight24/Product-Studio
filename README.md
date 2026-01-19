# AI Fashion Studio 🎨

A powerful, privacy-focused AI fashion design application that runs **100% locally** using Stable Diffusion. No cloud APIs, no subscriptions, no data sharing - complete creative freedom on your own machine.

![AI Fashion Studio](https://img.shields.io/badge/Version-1.0.0-purple?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Local](https://img.shields.io/badge/100%25-Local-blue?style=for-the-badge)

## Features ✨

- **🎨 AI-Powered Design Generation**: Create stunning fashion designs using Stable Diffusion
- **📚 40+ Curated Presets**: Professional fashion prompts across 4 categories (Day & Night Wear, Intimate & Loungewear, Swimwear, High Fashion & Runway)
- **🔒 100% Local & Private**: All processing happens on your computer - no cloud APIs
- **⚡ Real-time Preview**: See your designs as they're generated
- **🎯 Customizable Settings**: Fine-tune garment types, styles, and generation parameters
- **📸 Design Gallery**: Save and manage all your generated designs
- **💾 Easy Export**: Download your designs in high quality
- **🎭 Multiple Styles**: Modern, vintage, bohemian, minimalist, and more
- **👔 Various Garments**: Dresses, suits, jackets, accessories, and more

## Tech Stack 🛠️

### Frontend
- **React 18** - Modern UI framework
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web server framework
- **CORS** - Cross-origin resource sharing

### AI Engine
- **Stable Diffusion Web UI** (AUTOMATIC1111)
- Local image generation via API

## Prerequisites 📋

Before installing AI Fashion Studio, you need to set up Stable Diffusion:

### System Requirements
- **GPU**: NVIDIA graphics card with at least 8GB VRAM (recommended)
- **RAM**: 16GB or more
- **Storage**: 10GB free space for models
- **OS**: Windows, macOS, or Linux
- **Node.js**: Version 16 or higher

### Step 1: Install Stable Diffusion Web UI

1. Visit the official repository: [AUTOMATIC1111/stable-diffusion-webui](https://github.com/AUTOMATIC1111/stable-diffusion-webui)

2. Follow the installation instructions for your operating system:
   - **Windows**: Run `webui-user.bat`
   - **Mac/Linux**: Run `webui-user.sh`

### Step 2: Download a Model

1. Download **Stable Diffusion v1.5** from [Hugging Face](https://huggingface.co/runwayml/stable-diffusion-v1-5)
   - Get the `v1-5-pruned-emaonly.safetensors` file

2. Place the model in:
   ```
   stable-diffusion-webui/models/Stable-diffusion/
   ```

### Step 3: Enable the API

This is **crucial** for the Fashion Studio to work!

1. Open the launch script:
   - **Windows**: `webui-user.bat`
   - **Mac/Linux**: `webui-user.sh`

2. Find the line with `COMMANDLINE_ARGS`

3. Add the `--api` flag:
   ```bash
   # Windows
   set COMMANDLINE_ARGS=--api

   # Mac/Linux
   export COMMANDLINE_ARGS=--api
   ```

4. Save the file

### Step 4: Launch Stable Diffusion

1. Run the launch script:
   - **Windows**: Double-click `webui-user.bat`
   - **Mac/Linux**: Run `./webui.sh` in terminal

2. Wait for it to start. You should see:
   ```
   Running on local URL: http://127.0.0.1:7860
   ```

3. **Keep this terminal window open** while using AI Fashion Studio

## Installation 🚀

Once Stable Diffusion is running, install the Fashion Studio:

1. **Clone the repository**
   ```bash
   git clone https://github.com/DesignDelight24/Product-Studio.git
   cd Product-Studio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the application**
   ```bash
   npm start
   ```

   This will start both the backend server (port 5000) and frontend dev server (port 3000).

4. **Open your browser**
   ```
   http://localhost:3000
   ```

## Usage Guide 📖

### Creating Your First Design

1. **Check Connection Status**
   - Look for the green "Connected to Stable Diffusion" banner
   - If red, make sure SD Web UI is running with `--api` flag

2. **Choose Design Parameters**
   - **Garment Type**: Select from dress, suit, jacket, etc.
   - **Style**: Pick modern, vintage, bohemian, etc.

3. **Describe Your Vision**
   - Enter detailed description (colors, patterns, fabrics, details)
   - Example: *"flowing silk fabric with floral patterns in pastel pink and blue, elegant evening wear with lace details"*

4. **Adjust Advanced Settings** (Optional)
   - **Steps**: 20-50 (higher = better quality, slower)
   - **CFG Scale**: 1-20 (how closely to follow prompt)

5. **Generate**
   - Click "Generate Design"
   - Wait 30-60 seconds for your design
   - Download or save to gallery

### Using Fashion Presets 🎯

Get started quickly with professionally crafted prompts:

1. **Browse Presets**
   - Click "Browse Fashion Presets" button in the Design Studio
   - Explore 40+ curated presets across 4 categories

2. **Categories Available**
   - **Day & Night Wear** (10 presets): Everyday fashion and evening wear
   - **Intimate & Loungewear** (10 presets): Comfortable and intimate apparel
   - **Swimwear** (10 presets): Beach and poolside fashion
   - **High Fashion & Runway** (10 presets): Avant-garde and artistic fashion

3. **Select a Preset**
   - Browse by category tabs
   - Use search to find specific styles
   - Click any preset to load it into the design form
   - Preset automatically configures optimal settings

4. **Customize (Optional)**
   - Modify the loaded prompt to match your vision
   - Adjust generation settings if needed
   - Generate with one click

### Tips for Best Results 💡

- **Be Specific**: Detail colors, textures, patterns, and style
- **Use Fashion Terms**: "haute couture", "runway style", "tailored fit"
- **Mention Materials**: "silk", "cotton", "leather", "lace"
- **Describe Occasions**: "evening wear", "casual", "formal"
- **Reference Eras**: "1920s flapper", "Victorian", "80s punk"

### Example Prompts

```
"elegant red carpet gown with flowing chiffon, intricate beading on bodice, mermaid silhouette"

"minimalist blazer in charcoal grey wool, clean lines, oversized fit, contemporary business wear"

"bohemian summer dress with tie-dye patterns, flowing maxi length, peasant sleeves"

"vintage 1950s tea dress with polka dots, fitted waist, full skirt, retro style"
```

## Project Structure 📁

```
Product-Studio/
├── src/
│   ├── components/
│   │   ├── Header.jsx           # App header with navigation
│   │   ├── ConnectionStatus.jsx # SD connection indicator
│   │   ├── DesignStudio.jsx     # Main design interface
│   │   └── Gallery.jsx          # Generated designs gallery
│   ├── services/
│   │   └── imageGenerator.js    # SD API integration
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # React entry point
│   └── index.css                # Global styles
├── server/
│   └── index.js                 # Express backend server
├── public/                      # Static assets
├── index.html                   # HTML entry point
├── package.json                 # Dependencies
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind configuration
└── README.md                    # This file
```

## API Endpoints 🔌

The backend server provides these endpoints:

- `GET /api/health` - Health check
- `GET /api/check-sd` - Check Stable Diffusion connection
- `GET /api/models` - List available SD models
- `POST /api/generate` - Generate image from prompt
- `GET /api/progress` - Get generation progress
- `POST /api/interrupt` - Stop current generation

## Configuration ⚙️

### Backend Configuration

Create a `.env` file in the root directory (optional):

```env
PORT=5000
SD_API_URL=http://127.0.0.1:7860
```

### Frontend Configuration

The frontend automatically connects to the backend at `http://localhost:5000`.

To change this, edit `vite.config.js`:

```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:YOUR_PORT',
      changeOrigin: true,
    }
  }
}
```

## Troubleshooting 🔧

### "Stable Diffusion not connected"

1. **Check if SD Web UI is running**
   ```
   http://127.0.0.1:7860
   ```
   Should open the SD interface

2. **Verify API is enabled**
   - Check `webui-user.bat/sh` has `--api` flag
   - Restart SD Web UI after adding the flag

3. **Check firewall**
   - Ensure port 7860 is not blocked

### "Generation takes too long"

1. **Reduce steps**: Use 20-25 instead of 50
2. **Lower resolution**: 512x512 instead of 768x768
3. **Check GPU**: Ensure NVIDIA GPU is being used
4. **Close other apps**: Free up GPU memory

### "Out of memory" errors

1. **Lower batch size**: Should be 1
2. **Reduce resolution**: Use smaller dimensions
3. **Restart SD Web UI**: Clear GPU memory
4. **Enable optimizations**: Add `--medvram` or `--lowvram` to COMMANDLINE_ARGS

### Port conflicts

If ports 3000 or 5000 are in use:

**Backend**: Change PORT in `.env` or `server/index.js`

**Frontend**: Change in `vite.config.js`:
```javascript
server: {
  port: YOUR_PORT
}
```

## Development 👩‍💻

### Run in development mode

```bash
# Start backend only
npm run server

# Start frontend only
npm run dev

# Start both (recommended)
npm start
```

### Build for production

```bash
npm run build
```

This creates optimized files in the `dist/` folder.

### Preview production build

```bash
npm run preview
```

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments 🙏

- [AUTOMATIC1111](https://github.com/AUTOMATIC1111/stable-diffusion-webui) for the amazing Stable Diffusion Web UI
- [Stability AI](https://stability.ai/) for Stable Diffusion
- The open-source AI community for making local AI accessible

## Support 💬

If you encounter issues or have questions:

1. Check the [Troubleshooting](#troubleshooting-) section
2. Review [Stable Diffusion Web UI docs](https://github.com/AUTOMATIC1111/stable-diffusion-webui)
3. Open an issue on GitHub

---

**Made with ❤️ for fashion designers and AI enthusiasts**

*Privacy-first • Open-source • Community-driven*
