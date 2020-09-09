import csv

f = open('data.ts', 'w')
f.writelines('''import GameMetadata from './GameMetadata';
import { LocationType } from '../classes/Location';

const metadata: GameMetadata = {
''')

with open('map-info.csv') as csv_file:
  reader = csv.reader(csv_file)
  first = True
  for row in reader:
    if first:
      first = False
      continue

    id_str = row[0]
    type_str = row[1]
    spaceStationName = row[2]
    left = row[3]
    top = row[4]
    neighbors = row[5].split(',')

    f.writelines('''  '%s': {
    location: {
      id: '%s',
      type: LocationType.%s,\n''' % (id_str, id_str, type_str))
    if not spaceStationName == '':
      f.writelines('''      spaceStation: '%s',\n''' % spaceStationName)
    
    f.writelines('''    },
    neighbors: [\n''')

    for n in neighbors:
      f.write("      '{}',\n".format(n))

    f.writelines('''    ],
    pixelPosition: { left: %s, top: %s },
  },\n''' % (left, top))

f.writelines('''}

export default metadata;
''')
f.close()