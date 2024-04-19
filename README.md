## Getting Started

My application serves as a platform facilitating seamless communication between medical professionals and patients. During the registration process, users are provided with the option to identify themselves as either a doctor or a patient, and they can also personalize their profiles by adding a random avatar. The source code for the application is available on [GitHub](https://github.com/suyashjhawer2k/livewell), where users can explore the codebase, contribute, or report issues. Once deployed, the application is accessible at https://livewell-alpha.vercel.app, providing users with a convenient and reliable platform for communication. After logging in, users are greeted with a user-friendly interface featuring three primary buttons: "Users," "Chatrooms," and "Logout." The user experience is tailored based on the role selected during registration. For instance, if I log in as a doctor, I only see patients listed in the "Users" tab, and vice versa for patients. To initiate a conversation, I simply click on the desired individual from the "Users" tab, which instantly adds them to a chat room. Subsequently, clicking on the same user within the "Chatrooms" tab seamlessly transitions to the chat interface, facilitating uninterrupted communication. Behind the scenes, my application leverages Firebase Authentication for secure user management and Firestore for efficient storage and retrieval of chat data, ensuring a robust and reliable user experience..

## My App Functionalities

Authentication and User Management:
- I am using Firebase Authentication to handle user registration and login.
- Users are categorized as either doctors or patients.

Chat Functionality:
- Users can initiate chats with each other.
- Chat rooms are created dynamically when users initiate chats.
- Messages are sent within these chat rooms.
- Chat rooms and messages are stored in Firestore.
- When a user initiates a chat, a new chat room is created with the IDs of the users involved, along with other metadata like timestamps and the last message.

Data Model:
- The data model for a new chat room (chatroomData) includes:
- IDs of the users involved.
- Additional data about the users.
- Timestamp of creation.
- Metadata about the last message.

The data model for a new message (newMessage) includes:
- ID of the chat room.
- ID of the sender.
- Message content.
- Timestamp of sending.
- Optional image attachment.

Firestore Structure:
- Your Firestore database contains three main collections: users, chatrooms, and messages.
- Each collection holds documents corresponding to user data, chat room data, and message data, respectively.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deployed on Vercel

I've deployed my Next.js app using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js. You can access the deployed application at [https://livewell-alpha.vercel.app](https://livewell-alpha.vercel.app).

