import { spawn } from 'child_process';

async function startServices() {
    // Start the dev server
    const devServer = spawn('npm', ['run', 'dev'], {
        stdio: 'inherit',
        shell: true
    });

    // Wait a bit for the dev server to start
    await new Promise(resolve => setTimeout(resolve, 3000));

    try {
        // Start ngrok using the exe
        console.log('Starting ngrok tunnel...');
        const ngrokProcess = spawn('ngrok', ['http', '5173'], {
            stdio: 'inherit',
            shell: true
        });

        // Handle cleanup on exit
        process.on('SIGINT', () => {
            console.log('Shutting down...');
            ngrokProcess.kill();
            devServer.kill();
            process.exit(0);
        });

    } catch (err) {
        console.error('Error creating ngrok tunnel:', err);
        devServer.kill();
        process.exit(1);
    }
}

startServices(); 