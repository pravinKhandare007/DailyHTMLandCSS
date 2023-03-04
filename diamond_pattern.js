var row,i,j,blank_space = 1;
row =6;
blank_space = row -1;
var output_pattern="";

for(j=1;j<=row;j++){
    for(i=1;i<=blank_space;i++)
        output_pattern+=" "
    for(i=1;i<=2*j-1;i++)
        output_pattern='*'
    output_pattern+='\n'
    blank_space--;
}

console.log(output_pattern);
blank_space=1;

for(j=1;j<=row-1;j++){

}