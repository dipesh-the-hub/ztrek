// Overnight altitudes for the Everest Base Camp itinerary in src/lib/treks.ts,
// plus the high points trekkers climb to and descend from ("climb high, sleep low").

export interface ElevationStop {
  day: number;
  place: string;
  altitude: number;
  note: string;
}

export interface ElevationSummit {
  day: number;
  name: string;
  altitude: number;
}

export const everestProfile: { stops: ElevationStop[]; summits: ElevationSummit[] } = {
  stops: [
    { day: 1, place: "Kathmandu", altitude: 1400, note: "Arrive, meet your guide and check gear." },
    { day: 2, place: "Phakding", altitude: 2610, note: "Mountain flight to Lukla (2,860 m), then an easy walk down to Phakding." },
    { day: 3, place: "Namche Bazaar", altitude: 3440, note: "Suspension bridges and a steady climb into Sagarmatha National Park." },
    { day: 4, place: "Namche Bazaar", altitude: 3440, note: "Acclimatization day: hike up for first views of Everest, sleep low again." },
    { day: 5, place: "Tengboche", altitude: 3860, note: "The famous monastery, with Ama Dablam behind it." },
    { day: 6, place: "Dingboche", altitude: 4410, note: "Through rhododendron forest to a high farming village." },
    { day: 7, place: "Dingboche", altitude: 4410, note: "Second acclimatization day before going higher." },
    { day: 8, place: "Lobuche", altitude: 4940, note: "Past the Khumbu Glacier memorials." },
    { day: 9, place: "Gorak Shep", altitude: 5164, note: "Walk up to Everest Base Camp (5,364 m), then sleep at Gorak Shep." },
    { day: 10, place: "Pheriche", altitude: 4371, note: "Pre-dawn climb to Kala Patthar (5,545 m) for sunrise on Everest, then descend." },
    { day: 11, place: "Namche Bazaar", altitude: 3440, note: "Long descent back through Tengboche." },
    { day: 12, place: "Lukla", altitude: 2860, note: "Celebration dinner with your guide and porters." },
    { day: 13, place: "Kathmandu", altitude: 1400, note: "Morning flight back to Kathmandu." },
    { day: 14, place: "Kathmandu", altitude: 1400, note: "Transfer to the airport for your flight home." },
  ],
  summits: [
    { day: 9, name: "Everest Base Camp", altitude: 5364 },
    { day: 10, name: "Kala Patthar", altitude: 5545 },
  ],
};
