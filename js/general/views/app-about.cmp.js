export default {
	template: `
        <section class="about-page">
            <h1>About Us</h1>
            <p class="about-apps">
            If you want to be productive, you need the right tools. With the right tools, you can get anything done.
            <!-- The Notes app is the perfect way to jot down ideas, make lists, and keep track of everything you need to do. The Email app is the perfect way to stay in touch with friends, family, and colleagues. And the Books app is the perfect way to find and read the latest bestsellers.
            With these three apps, you have everything you need to get things done. -->
            </p>
            <div class="about-us">
                <div className="card1">
                    <div className="cat">
                        <img src="assets/img/ginger-cat.jpg" alt="" />
                        <p>Yotam, Full Stack Developer</p>
                    </div>
                    <div className="info">
                        <p>
                        As a developer, I am always looking to improve my skills and learn new technologies. I am currently enrolled in a full stack bootcamp where I am learning new skills and advancing my knowledge in web development. I am passionate about my work and strive to create the best user experience possible.
                        </p>
                    </div>
                </div>
                <div className="card2">
                    <div className="cat">
                        <img src="assets/img/gray-cat.jpg" alt="" />
                        <p>Yarden, Full Stack Developer</p>
                    </div>
                    <div className="info">
                        <p>
                        I'm a full stack developer and I'm loving it! I'm currently enrolled in a full stack development bootcamp and it's been an amazing experience so far. I've learned so much and I'm really enjoying the work. The bootcamp has been challenging, but it's been a great learning experience. I'm excited to see what the future holds for me in this field.
                        </p>
                    </div>
                </div>
           </div>
           <form>
               <div className="contact">
                   <h2>Contact Us</h2>
                       <div class="user-info">
                           <input type="text" placeholder="Name" />
                           <input type="email" placeholder="Email" />
                        </div>
                        <textarea name="" id="" cols="30" rows="2" placeholder="What Would You Like Know?"></textarea>
                        <button>Send</button>
                </div>
            </form>
        </section>
    `
}
