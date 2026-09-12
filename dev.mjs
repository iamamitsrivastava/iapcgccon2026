import { spawn, execSync } from 'child_process';
import net from 'net';

const defaultPort = parseInt(process.env.PORT || '3000', 10);
const host = '127.0.0.1'; // Bind specifically to IPv4 localhost

function freePort(port) {
    try {
        const pids = execSync(`lsof -t -i :${port}`).toString().trim().split('\n');
        if (pids.length > 0 && pids[0] !== '') {
            console.log(`[dev.mjs] ⚠️  Port ${port} is in use by PID(s): ${pids.join(', ')}. Freeing it now...`);
            for (const pid of pids) {
                if (pid) {
                    execSync(`kill -9 ${pid}`);
                    console.log(`[dev.mjs] ✅ Killed process ${pid}`);
                }
            }
            return true;
        }
    } catch {
        // If lsof fails, it usually means no process is running on that port
    }
    return false;
}

function checkPortFree(port) {
    return new Promise((resolve) => {
        const server = net.createServer();
        server.once('error', () => resolve(false));
        server.once('listening', () => {
            server.close(() => resolve(true));
        });
        server.listen(port, host);
    });
}

async function findOrFreePort(startPort) {
    let port = startPort;

    // Try to free the preferred port first!
    const freed = freePort(port);
    if (freed) {
        // wait a moment for OS to actually release the socket
        await new Promise(r => setTimeout(r, 500));
    }

    // Fallback check
    while (!(await checkPortFree(port))) {
        console.log(`[dev.mjs] ⚠️  Port ${port} is still in use or could not be freed on ${host}. Trying ${port + 1}...`);
        port++;
    }
    return port;
}

async function start() {
    const port = await findOrFreePort(defaultPort);
    console.log(`[dev.mjs] 🚀 Starting Next.js dev server on http://${host}:${port}`);

    const isWin = process.platform === 'win32';
    const command = isWin ? 'npx' : './node_modules/.bin/next';
    const args = isWin ? ['next', 'dev', '-H', host, '-p', port.toString()] : ['dev', '-H', host, '-p', port.toString()];
    const child = spawn(command, args, {
        stdio: 'inherit',
        env: { ...process.env, PORT: port.toString() },
        shell: true
    });

    child.on('error', (err) => {
        console.error(`\n[dev.mjs] ❌ Failed to start subprocess. Error: ${err.message}\n`);
        process.exit(1);
    });

    child.on('exit', (code, signal) => {
        if (signal) {
            console.error(`\n[dev.mjs] ❌ Next.js server was terminated by signal: ${signal}\n`);
            process.exit(1);
        } else if (code !== 0) {
            console.error(`\n[dev.mjs] ❌ Next.js server crashed with exit code: ${code}\n`);
            process.exit(code);
        } else {
            console.log(`\n[dev.mjs] ✅ Next.js server exited cleanly.\n`);
            process.exit(0);
        }
    });

    const handleInterrupt = () => {
        console.log('\n[dev.mjs] 🛑 Received interrupt signal, terminating Next.js...');
        child.kill('SIGINT');
    };

    process.on('SIGINT', handleInterrupt);
    process.on('SIGTERM', handleInterrupt);
}

start().catch((err) => {
    console.error('\n[dev.mjs] ❌ Fatal error starting server:', err);
    process.exit(1);
});
