# VCBooking
<p>The core idea of the project is to build a web application for venue/room booking for meetings held in organization. The app should work on calendar events like google calendar, all the meetings should be created by the users using the calendar drag and drop between time slots for the meeting to be held. The meeting delete should be user specific and only allowed to the user who created the meeting. Any other user should not be able to create a meeting during the time slot which is already occupied by the existing meetings. Other modules include the My Bookings page which should list all the meetings booked by the logged in user in a tabular format. Login activity includes all the login details Login Time, IP Address, Device, Login failed/success and country represented in a tabular format. My profile page gives the functionality of updating profile details including reset password, which works on the idea of sending a password reset link to the user’s email address through which he can reset the password. This link is active only for 1 hour. Finally, the logout functionality logs out the user from the account and returns to the home page.</p>
<p>Another page is the Admin Login page through which only the Admin can log in. This page displays the details of all the meetings. There are 6 subcomponents in this page which includes Today’s VCs (All the meetings that are scheduled to take place today), Scheduled VCs(All the meetings that are scheduled to happen in future), Completed VCs (All the meetings that are completed in the past), Manthan completed VCs (All the meetings that are completed in past and having Manthan as the Venue), GMB completed VCs (All the meetings that are completed in past and having GM Building as the Venue) and Maskfab Completed Meetings (All the meetings that are completed in past and having Masfab as the Venue). In all these subcomponents, the requirement is to display meeting details (Meeting Name, Meeting Time, Meeting Date, Venue, Status, User who created the meeting) in a tabular format and options for printing the table in ascending order of the date and venue in either PDF or excel format.</p>

To run this project:
<ol>
<li>Clone this repository.
<li>Install dependencies by npm install in client.
<li>Add log.js file to node_modules/webpack/hot in client folder.
<li>Install dependencies by npm install in server.
<li>Run the client side by npm start.
<li>Run the server side by npm run devStart.
</ol>

