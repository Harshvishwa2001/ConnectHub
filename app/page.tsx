import Feed from "@/Component/Feed";
import News from "@/Component/News";
import Slidebar from "@/Component/Slidebar";
import { currentUser } from "@clerk/nextjs/server";
export const dynamic = 'force-dynamic';

export default async function Home() {
  const user = await currentUser(); 
  return (
   <div className="pt-20 ">
    <div className="max-w-6xl mx-auto flex justify-between gap-5">
      {/* SlideBar */}
    <Slidebar user = {user}/>
    {/* Feeds */}
    <Feed user={user}/>
    {/* News */}
    <News/>
    </div>
   </div>
  );
}
  