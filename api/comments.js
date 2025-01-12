let comments = []; // In-memory array to store comments

export default function handler(req, res) {
    const { method } = req;
    switch (method) {
        case 'GET': // Handle GET requests
            res.status(200).json([]); // Return an empty array as a placeholder
            break;
        case 'POST': // Handle POST requests
            const { name, message } = req.body;
            if (name && message) {
                res.status(201).json({ message: 'Comment added successfully!' });
            } else {
                res.status(400).json({ message: 'Name and message are required!' });
            }
            break;
        case 'DELETE': // Handle DELETE requests
            res.status(200).json({ message: 'All comments have been cleared!' });
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}


