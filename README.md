# 🐾 Fetchly

## 🎯 About the Project
Fetchly is a full-stack social networking platform for pet lovers. Users can create and share pet-related posts, schedule pet meetups, or view pets for adoption. Whether you're organizing a puppy playdate or trying to rehome a kitten, Fetchly brings the pet community together with a friendly and intuitive interface.

## 🚀 Features
- **Dynamic Post Creation** A centralized modal intelligently opens different post forms (Freeform, Pet Meet Up, or Adoption) based on the page or user selection.
- **Freeform Posts** Share cute moments, updates, or photos of your pets.
- **Pet Meet Ups** Create meetup events with a title, description, date, time, and location. Other users can RSVP.
- **Adoption Posts** Browse pet profiles for animals needing homes, including breed, age, gender, size, and allergies.
- **Chat with Friends** Message users on your friends list through direct or group chats.

## App Preview
![Login Page](image.png)
![Inbox Page](image-1.png)
![New Post](image-2.png)


## 💻 Technologies Used
Frontend: React, TypeScript, HTML, CSS
Backend: Node.js, Express
Database: MongoDB (Mongoose)
API Architecture: GraphQL with Apollo Client & Server
Other Tools: React Router, Cypress (Testing), Vite, GitHub

## 📦 Installation & Setup
Clone the repository:

git clone https://github.com/yourusername/fetchly.git
cd fetchly/client
Install dependencies:

npm install
Start the development server:

npm run dev
Set up environment variables in a .env file (e.g., MongoDB URI, JWT secret).

## 📌 Usage
Sign up or log in.
Navigate to the Home, MeetUp, Adoption, or Inbox page.
Click the post button to open the context-aware modal.
Select a post type (or use the dropdown on other pages).
Submit your post and see it appear in the feed.
RSVP to meetups or inquire about adoptions.

## 🛠️ Future Improvements
🗺️ Enhanced Location Experience: Integrate visual maps (Google Maps or Mapbox) to preview and select meetup locations.
🧬 Advanced Pet Matching: Suggest playmates or adopters based on pet traits, location, or user behavior.
🧑‍🤝‍🧑 Extended Social Features: Suggest mutual friends or meetup groups based on location and activity.
🔔 Notification System: In-app or email notifications for RSVPs, new messages, and adoption interest.
🔒 Privacy & Content Controls: Allow users to make posts private, block users, or filter who can RSVP or message them.

## 🤝 Contributing
Contributions are welcome! If you'd like to contribute:

Fork the repository.
Create a feature branch: git checkout -b feature-name.
Commit changes: git commit -m 'Add new feature'.
Push to your branch: git push origin feature-name.
Open a pull request.

## 📜 License
This project is licensed under the MIT License.

## 🐕 Built With ❤️ by Animal Lovers
Fetchly was created by a team of pet enthusiasts with a passion for technology and community. Because pets deserve social lives too.
