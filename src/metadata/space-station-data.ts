import { SpaceStationMetadata } from './types';

const metadata: SpaceStationMetadata = {
  'andromeda': {
    location: 'andromeda',
    information: 'The Food Repair Team is currently out on another mission and will not return to Andromeda until Day 14.',
  },
  'aquarius': {
    location: 't3',
    information: {
      title: 'FOOD AT ORION',
      bulletPoints: [
        'The food processing systems were destroyed at the time of the damage.',
        'The emergency food reserves are running out and loss of life will begin on Day 24 unless they are fixed.',
        'A Food Repair Team will become available at Andromeda.',
      ],
    }
  },
  'boreallis': {
    location: 't5',
    information: {
      title: 'O2 REPAIR AT ORION',
      bulletPoints: [
        'The 02 Repair Team can immediately and permanently restore 02 to ORION upon their arrival there.',
        'However, they are unable to leave Borealis until AI technology from Capricorn comes to replace them.',
        'Leaving with the O2 Repair Team prior to that will put all 200 scientists at Borealis at risk.',
      ],
    }
  },
  'capricorn': {
    location: 't4',
    information: {
      title: 'INJURIES AT ORION',
      bulletPoints: [
        'Three injuries were sustained at the time of the damage.',
        'The injuries are getting progressively worse, and all three will die on Day 25 without advanced medical treatment.',
        'The medical team is currently available at Cassiopeia.',
      ]
    }
  },
  'cassiopeia': {
    location: 'cassiopeia',
    information: {
      title: 'WATER PROVISION AT ORION',
      bulletPoints: [
        'The water purification system shut down during the time of the damage.',
        'There is enough reserved water to keep the scientists alive, but only until Day 23. Loss of life will begin unless the station’s water systems are permanently fixed.',
        'A Water Repair Team is available at Aquarius.',
      ]
    }
  },
  'orion': {
    location: 't2',
    information: {
      title: 'O2 AT ORION',
      bulletPoints: [
        'The scientists of Space Station Orion are quickly running out of oxygen.',
        'The O2 replacement cells aboard your ship will temporarily solve the oxygen generation problem until Day 21.',
        'Loss of life will begin again if a permanent oxygen generation solution isn’t installed by Day 21.',
      ]
    }
  },
  'sagittarius': {
    location: 'sagittarius',
    information: {
      title: 'DAMAGE TO SPACE STATION ORION',
      bulletPoints: [
        'Orion’s primary source of oxygen generation has been badly hit.',
        'They only have 6 days of oxygen supply left before the loss of life begins.',
        'Without repairs, oxygen generation will shut down completely in 21 days.',
      ]
    }
  },
};

export default metadata;
