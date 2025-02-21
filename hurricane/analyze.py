

filename = "hurdat2-nepac-1949-2023-042624.txt"

count = 0





with open(filename) as f:
    
    print("let storm_data = {")
    while True:
        line = f.readline()
        line = line.strip()
        #print(line)

        tokens = line.split(',')

        
        if len(tokens) == 4:
            i_d = tokens[0].strip()
            print("\t{'" + i_d + "'", ":")

            storm_name = tokens[1].strip()
            print("\t\t{" + "name:", "'" + storm_name + "'" + ",")
            
            token_count = int(tokens[2])
            print("\t\t coords: [", end=' ')
            for i in range(token_count):
                data_line = f.readline()
                data_line = data_line.strip()
                
                tokens2 = data_line.split(',')
                x_coords = tokens2[4]
                y_coords = tokens2[5]
                
                
                print("[" + x_coords + "," + y_coords + "],", end=' ')
            print("]")
            print("\t\t}")
            print("\t},")



        count += 1
        if count > 10:
            break
    print("}")
        
        
    
    
