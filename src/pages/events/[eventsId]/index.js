// import { MongoClient, ObjectId } from "mongodb";
// import EventDetailPage from "../../../../components/EventPages/EventDetailPage";

// export default function Events(props) {
//   return <EventDetailPage title={props.parties.title} />;
// }

// export async function getStaticPaths() {
//   // fetch data from an API
//   const client = await MongoClient.connect(
//     "mongodb+srv://diana:diana@atlascluster.qc6evfi.mongodb.net/parties?retryWrites=true&w=majority"
//   );
//   const db = client.db();

//   const partyList = db.collection("parties");

//   const parties = await partyList.find({}, { partyId: 1 }).toArray();

//   client.close();
//   return {
//     fallback: false,
//     paths: parties.map((party) => ({
//       params: { eventsId: party.partyId },
//     })),
//   };
// }

// export async function getStaticProps(context) {
//   const eventsId = context.params.eventsId;
//   // fetch data from an API
//   const client = await MongoClient.connect(
//     "mongodb+srv://diana:diana@atlascluster.qc6evfi.mongodb.net/parties?retryWrites=true&w=majority"
//   );
//   const db = client.db();

//   const partylist = db.collection("parties");

//   const selectParty = await partylist.findOne({ partyId: eventsId });

//   client.close();
//   return {
//     props: {
//       parties: {
//         title: selectParty.title,
//         image: selectParty.image,
//         date: selectParty.date,
//         partyId: selectParty.partyId,
//       },
//     },
//   };
// }
import EventDetailPage from "../../../../components/EventPages/EventDetailPage";
import { useRouter } from "next/router";

export default function Events(props) {
  return (
    <EventDetailPage
      description={props.parties.description}
      title={props.parties.title}
      date={props.parties.date}
      image={props.parties.image}
    />
  );
}

export async function getStaticPaths() {
  try {
    const res = await fetch("http://localhost:3000/api/findparty"); // Replace with the correct URL to access your API route
    const parties = await res.json();

    return {
      fallback: false,
      paths: parties.map((party) => ({
        params: { eventsId: party.partyId },
      })),
    };
  } catch (error) {
    console.error("Error fetching partyId list:", error);
    return {
      fallback: false,
      paths: [],
    };
  }
}
export async function getStaticProps(context) {
  const { eventId } = context.params;

  try {
    const res = await fetch(`http://localhost:3000/api/${eventId}`); // Replace with the correct URL to access your API route
    const selectParty = await res.json();

    return {
      props: {
        parties: {
          title: selectParty.title,
          image: selectParty.image,
          date: selectParty.date,
          partyId: selectParty.partyId,
          description: selectParty.description,
        },
      },
    };
  } catch (error) {
    console.error("Error fetching party details:", error);
    return {
      props: {
        parties: {}, // Return empty data in case of an error
      },
    };
  }
}
