import { useRouter } from "next/router";
import { MongoClient } from "mongodb";

import EventItem from "../../../components/Events/EventItem";

function Events(props) {
  //   const router = useRouter();

  //   const backH = () => {
  //     router.push("/");
  //   };

  //   async function deleteRoutine(props){
  //     const response = await fetch('/api/new-routine', {
  //       method: 'DELETE',
  //       body: JSON.stringify(props._id),
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log(data);
  //       router.push("/routinelist");

  //     } else {
  //       console.error('Failed to fetch data');
  //     }
  // }
  console.log(props.parties);
  return (
    <>
      <EventItem parties={props.parties} />
      {/* <div className={classes.actions}><button onClick={backH}>Back</button></div>  */}
    </>
  );
}

export default Events;

export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://diana:diana@atlascluster.qc6evfi.mongodb.net/parties?retryWrites=true&w=majority"
  );
  const db = client.db();

  const partyList = db.collection("parties");

  const parties = await partyList.find().toArray();
  client.close();

  return {
    props: {
      parties: parties.map((party) => ({
        partyId: party.partyId,
        title: party.title,
        image: party.image,
        date: party.date,
      })),
    },
    revalidate: 1,
  };
}
