// src/data/commentsData.js

export const ALL_COMMENTS_DATA = [
  {
    id: "c1",
    author: { username: "Alice Johnson" },
    timestamp: "14:30",
    content:
      "Great insights on React patterns! I especially liked the part about component composition.",
    type: "post",
    replies: [
      {
        id: "c2",
        author: { username: "Bob Smith" },
        timestamp: "14:35",
        content:
          "Totally agree! The composition pattern has made my code so much more maintainable.",
        type: "post",
        replies: [
          {
            id: "c3",
            author: { username: "Carol Williams" },
            timestamp: "14:40",
            content:
              "Same here. It's a game-changer for scalable applications.",
            type: "post",
            replies: [],
          },
        ],
      },
    ],
  },
  {
    id: "c4",
    author: { username: "David Brown" },
    timestamp: "15:45",
    content:
      "Could you elaborate more on the performance implications of these patterns?",
    type: "post",
    replies: [],
  },
  {
    id: "c5", // Example for a document comment (if this were in DocumentDetail)
    author: { username: "Emma Davis" },
    timestamp: "16:20",
    content:
      "The API documentation looks comprehensive. Just one suggestion: could we add more examples for the authentication endpoints?",
    type: "document",
    replies: [
      {
        id: "c6",
        author: { username: "Frank Wilson" },
        timestamp: "16:25",
        content: "Good point! I'll add those examples in the next revision.",
        type: "document",
        replies: [],
      },
    ],
  },
];
