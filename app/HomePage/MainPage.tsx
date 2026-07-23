
import HeroPage from "./HeroPage";
import HomeAboutPage from "./AboutUsPage";
import HomeServiceSection from "./ServicePage";
import HomeProject from "./ProjectPage";
import HomeBlogPage from "./BlogPage";
import HomeContactPage from "./ContactPage";



export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">

     
       <HeroPage />
      <HomeAboutPage />
      <HomeServiceSection  />
      <HomeProject />
      <HomeBlogPage />
      <HomeContactPage /> 
    
      
    </div>
  );
}
