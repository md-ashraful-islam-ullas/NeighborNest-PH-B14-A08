'use client';
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export type ApiEvent = {
  _id: string;
  title: string;
  eventType: string;
  date: string;
  location: string;
  description: string;
  thumbnailUrl: string;
};



const JoinEventButtonCard = ({event} : {event: ApiEvent}) => {
  const router = useRouter();
    const { data: session } = authClient.useSession();
      const user = session?.user;
    
      const handleJoinEvent = async () => {
        if (!user) {
          router.push("/sign-in");
          return;
        }

        const data = {
            ...user,
            ...event,
        };

        const res = await fetch(`http://localhost:5000/join-event`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const joinEventResponse = await res.json();
        console.log(joinEventResponse);
      };

    return (
        <aside className="rounded-2xl border border-[#e6d3c0] bg-white p-6 sm:p-7 lg:sticky lg:top-6">
            <h2 className="text-3xl leading-tight font-bold">Ready to help?</h2>
            <Button onClick={handleJoinEvent}
              
              className="mt-5 flex min-h-13 items-center justify-center rounded-md bg-[#a63f1c] px-4 py-3 text-base font-bold text-white transition-colors hover:bg-[#8f3215] focus-visible:ring-4 focus-visible:ring-[#b1421c]/30 focus-visible:outline-none"
            >
              Join Event
            </Button>
            <p className="mt-4 text-base leading-6 text-[#695c54]">
              Free to join. Find it later under Joined Events.
            </p>
            <div className="mt-5 border-t border-[#e6d3c0] pt-4 text-base text-[#695c54]">
              Organized by <span className="font-bold text-[#211b18]">demo</span>
            </div>
          </aside>
    );
};

export default JoinEventButtonCard;