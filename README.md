# 🍯 Pooh Errors: A Storybook Honeypot

*In Which a Clever Page is Explained for Friends and Other Interested Parties.*

---

**Pooh Errors** is a whimsical, storybook-themed honeypot that doubles as a fully functional custom error page. It's
designed to gently confuse and delight both curious humans and automated bots who have wandered into a part of the Wood
they shouldn't have.

---

### ✨ Features

* **📖 Dynamic Storybook Chapters:** Automatically displays a unique story and interactive conversation for any 4xx
  client error code.
* **🤖 Deceptive Bot Trap:** Engages persistent visitors and bots in an endless, looping dialogue, trapping them in a
  charming narrative.
* **🔧 Easy to Customize:** A single, self-contained HTML file that's simple to configure.
* **🧸 Authentic Voice:** All stories and dialogue are carefully crafted to capture the naive, heartfelt voice of Pooh
  Bear.

---

### 🚀 How to Implement

There are two simple ways to use this page.

#### 1. URL Parameter (Recommended)

Redirect your web server's errors to this file and pass the error code in the URL. The page will automatically display
the correct chapter.

**URL Format:**
`.../pooh_errors.html?error={CODE}`

**Examples:**

* `.../pooh_errors.html?error=404` ➡️ Loads Chapter 404.
* `.../pooh_errors.html?error=403` ➡️ Loads Chapter 403.

#### 2. Set a Default Chapter

If you can't use URL parameters, you can set a default chapter by editing one line in the HTML file.

1. Open the `.html` file in a text editor.
2. Scroll to the `<script>` tag at the bottom.
3. Find and change this line:

   ```javascript
   // --- USER EDITABLE: DEFAULT ERROR CODE ---
   const USER_DEFAULT_ERROR_CODE = 418; // Change 418 to your desired default
   ```

---

### 📚 Available Chapters

<details>
<summary>Click to view all 29 available chapters</summary>

* **400:** In Which a Request is Rather Bothering
* **401:** In Which a Secret Knock is Required
* **402:** In Which a Toll of Honey is Required for Passage
* **403:** In Which This Part of the Wood is Forbidden
* **404:** In Which a Very Important Pot is Missing
* **405:** In Which One Tries to Go In Through the Out Door
* **406:** In Which Pooh is Offered a Thistle Instead of Honey
* **407:** In Which One Must First Speak to Rabbit
* **408:** In Which Pooh Waited, and Waited, and Fell Asleep
* **409:** In Which Pooh and his Tummy Disagree
* **410:** In Which the Smackerel Was Already Eaten
* **411:** In Which a Bear Must Know the Size of Things
* **412:** In Which One Must Be a Friend Before Entering
* **413:** In Which the Pot is Too Full of Honey
* **414:** In Which the Path is Too Long for Little Legs
* **415:** In Which Pooh Only Understands Pictures of Honey
* **416:** In Which There is No Honey at the Bottom of the Pot
* **417:** In Which Pooh Expected Honey, but Found None
* **418:** In Which Pooh is Not a Teapot, but is a Bear with a Honeypot
* **421:** In Which a Note for Owl is Given to Pooh
* **422:** In Which the Request is a Muddle of Words
* **423:** In Which the Honey Pot Lid is Stuck
* **424:** In Which a Plan for a Party Fails
* **425:** In Which It is Not Yet Time for a Smackerel
* **426:** In Which a Simple Bear Needs a Simpler Plan
* **428:** In Which One Must First Say 'Please'
* **429:** In Which There is Too Much Bouncing, Tigger
* **431:** In Which the Note is Too Long to Read
* **451:** In Which Christopher Robin Said We Cannot Go There

</details>

---

A bear of very little brain hopes this page brings a little bit of warmth to the cold, technical world of error codes.
Do be careful of any Woozles on your way out.
