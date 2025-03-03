

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
            i_d = tokens[0].strip()
            print("\t{'i_d':'" + i_d + "',")

            storm_name = tokens[1].strip()
            print("\t" + "'name':", "'" + storm_name + "'" + ",")
            
            token_count = int(tokens[2])
            print("\t 'coords': [", end=' ')
            for i in range(token_count):
                data_line = f.readline()
                data_line = data_line.strip()
                
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
            print("]")
            print("\t},")



        count += 1
        if count > 10:
            break
    print("]")
        
        
    
    
