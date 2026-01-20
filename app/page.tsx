import Link from "next/link";

export default function Home() {  
  

  return (
    <main>
      <div className="w-full h-[400px] green-gradient flex justify-center items-center text-white semi-circle-bottom">
    
          <div className="text-center">
            <h1 className="">Welcome to the Todo App</h1>
            <p>Start here to create and manage your todo lists</p>
       

          </div>
        
        
    
        
      </div>
      <div className=" w-full text-center mt-[10px]">
        <Link href={"/login"}>
          <button className="green-gradient-alt h-[50px] w-[150px] rounded-2xl text-white">Get Started</button>
        </Link>
      </div>
      
    </main>
  );
}
