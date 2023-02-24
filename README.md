# StoopIt Project

### Team Members

[Corey Chen](https://github.com/coherency1), [Malachi Daniel](https://github.com/163dgm), [Kai Elwood-Dieu](), [Cheng Charles Ji](https://github.com/szcharlesji), [Brian Lee](https://github.com/shl622)

### What is "Stooping"?

Stooping is a modern form of "one person's trash is another's treasure". Stooping is the act of picking up items off thrown out by others on the street before they are taken by a garbage truck. Stooping is a commonly seen phenomenon in New York City, where large items such as furniture or appliances are left outside on the curb on garbage day. When people find the object and pick it up, they have "stooped" it.

Many people in NYC stoop furniture as it is a sustainable and affordable way to furnish your home. One of the most popular accounts for stooping is [@stoopingnyc](https://www.instagram.com/stoopingnyc) on Instagram. With over 470K followers, this account posts potential "stoops" (items on the street that people might want) for others to pick up and take home.

The problem with [@stoopingnyc](https://www.instagram.com/stoopingnyc) is that they rely on users to submit stoops that they have found, and they accept stoops from all over NYC. Coupled with hundreds of thousands of followers, this results in stoops being posted to the page hours after they were initially found and submitted. Furthermore, the stoops are guaranteed to be very far from most people's locations due to how many followers there are all over NYC. This causes a feeling of missing out for users who are too far away or don't have the means to retrieve the furniture of their dreams. Or people rushing to stoop an item, only to arrive and see it has been taken since it was initially submitted hours ago. As a result, many location-specific stooping social media accounts have been made, such as [@stoopingbrooklyn](https://instagram.com/stoopinginbrooklyn), [@stoopinginqueens](https://www.instagram.com/stoopinginqueens), [@stoopingdowntown](https://www.instagram.com/stoopingdowntown), and many more for different areas of NYC.

We want to build **StoopIt**, a web app for stooping. Users will snap a picture of a potential stoop on their phone and upload it to the app, describing the type of item and its location. Once uploaded, other users using the app in the area will see the stoop in real-time and be able to grab it while it's still available. The homepage will consist of a scrolling feed of stoops, and users can filter their stoop feed; for example, only showing chairs within a 1-mile radius of their current location.

Stooping itself is important to continue as it promotes sustainability and saves people money. We shouldn't have to buy an entirely new dresser if there is a perfectly good one that someone doesn't want. StoopIt will be useful as it removes the issues with current stooping social media accounts with user submissions and admins. StoopIt will give users a better experience finding the perfect stoops by utilizing real-time location data and filtering. It also has the potential of growing and spreading to other cities as the data is location-based and not managed by an account.

### Product Vision

Users will navigate to the web app and be greeted with a vertical scrolling feed of items found near them (by default, it will be 1 mile). Users will be able to change their feed settings, such as filtering by item (like a specific type of furniture) or changing the mile radius to allow more items to be shown in the feed. When logged in, users can upload a stoop that they have found. They do this by navigating to an upload form. The form has fields to upload or take an image, write a title, description, category (these will be pre-set to use for filtering), and a location (if users don't know the specific address, they can click a button to autofill with their current location). Once uploaded, other users in the area can see the item on their feed when they refresh.

Our product is very easy to extend and add more features to. In its simplest form, this project is not too easy as it goes beyond a basic CRUD web application.

In terms of the frontend, it requires a user-friendly and mobile-first UI that will also need to utilize map and location APIs, along with authentication and form validation to create an item (form validation could either be done on the frontend or backend). This could be effectively split between a group of programmers, one to handle the UI, authentication and validation, maps and location, and connecting with the backend could be split between a group of programmers in one sprint. The backend will need to effectively parse and store location data of items, handle authentication, and handle location-based queries for items in the database. Furthermore, much of this can be accomplished using native browser and Node APIs; this means we can effectively increase or lower the time spent based on whether or not we install 3rd-party libraries.

If the application is easier than expected, there are many potential improvements and features that could be added. Our backend could switch from using REST API to a GraphQL-based architecture, leveraging subscriptions, so users can get a true real-time experience. This prevents needing to refresh or click a button to fetch new items for the feed; instead, it could be updated live. We can also add text notifications when an item has popped up in your area or implement a chat with uploaders of items for more info before going out to stoop. There are many ways we can add to this app, but providing users with a centralized and seamless way to view and upload items near them already solves many problems for the stooping community.

### Contribution

If you are interesting in contributing to this project, please refer to [CONTRIBUTING.md](./CONTRIBUTING.md).