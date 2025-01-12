let comments = []; // In-memory array to store comments

export default function handler(req, res) {
    const { method } = req;

    // Add CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS"); // Allowed methods
    res.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Allowed headers for POST requests

    // Handle preflight OPTIONS request
    if (req.method === "OPTIONS") {
        res.status(200).end();
        return;
    }

    // Handle GET, POST, DELETE requests
    switch (method) {
        case "GET":
            res.status(200).json(comments);
            break;
        case "POST":
            const { name, message } = req.body;
            if (name && message) {
                const newComment = { id: Date.now(), name, message };
                comments.push(newComment);
                res.status(201).json({ message: "Comment added successfully!", comment: newComment });
            } else {
                res.status(400).json({ message: "Name and message are required!" });
            }
            break;
        case "DELETE":
            comments = [];
            res.status(200).json({ message: "All comments have been cleared!" });
            break;
        default:
            res.setHeader("Allow", ["GET", "POST", "DELETE", "OPTIONS"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
