let comments = []; // In-memory array to store comments

export default function handler(req, res) {
    const { method } = req;

    switch (method) {
        case 'GET': // Fetch all comments
            res.status(200).json(comments);
            break;

        case 'POST': // Add a new comment
            const { name, message } = req.body;

            if (name && message) {
                const newComment = { id: Date.now(), name, message }; // Add unique ID
                comments.push(newComment);
                res.status(201).json({ message: 'Comment added successfully!', comment: newComment });
            } else {
                res.status(400).json({ message: 'Name and message are required!' });
            }
            break;

        case 'DELETE': // Clear all comments
            comments = []; // Clear the in-memory array
            res.status(200).json({ message: 'All comments have been cleared!' });
            break;

        default: // Handle unsupported methods
            res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}
