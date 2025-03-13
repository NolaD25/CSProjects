

filename = "hurdat2-nepac-1949-2023-042624.txt"

count = 0





with open(filename) as f:
    
    print("let storm_data = [")
    while True:
        line = f.readline()
        line = line.strip()
        #print(line)

        tokens = line.split(',')

        
        if len(tokens) == 4:

            # parse the whole line first
            i_d = tokens[0].strip()
            storm_name = tokens[1].strip()
            ints = tokens[2].strip()
            token_count = int(tokens[2])

            # only print stuff for named storms
            if storm_name != "UNNAMED":
                print("\t{'i_d':'" + i_d + "',")
                print("\t" + "'name':", "'" + storm_name + "'" + ",")
                print("\t 'nums':", "'" + ints + "',")
                print("\t 'coords': [", end=' ')

            for i in range(token_count):
                data_line = f.readline()
                data_line = data_line.strip()

                # we need to read the line, but don't do anything else
                if storm_name == "UNNAMED":
                    continue
                
                tokens2 = data_line.split(',')
                x_coords = tokens2[4]
                y_coords = tokens2[5]
                
                x_direction = x_coords[-1:]
                y_direction = y_coords[-1:]
                
                north = "N"
                south = "S"
                east = "E"
                west = "W"
                
                if x_direction == north:
                    x_coords = x_coords[:-1]
                    x_num = float(x_coords)
                if x_direction == south:
                    x_coords = x_coords[:-1]
                    x_num = float(x_coords)
                    x_num = -abs(x_num)
                if y_direction == east:
                    y_coords = y_coords[:-1]
                    y_num = float(y_coords)
                if y_direction == west:
                    y_coords = y_coords[:-1]
                    y_num = float(y_coords)
                    y_num = -abs(y_num)
                
                print("[" , x_num , "," , y_num , "],", end=' ')


            if storm_name != "UNNAMED":
                print("]")
                print("\t},")


        count += 1
        if count > 30:
            break
    print("]")
        
        
    
    
