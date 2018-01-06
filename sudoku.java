
public class Problem {
    public static void main (String[] args) {
        Problem problem = new Problem();
        int[][] table = { {0,0,0,2,6,0,7,0,1} ,
                          {6,8,0,0,7,0,0,9,0} ,
                          {1,9,0,0,0,4,5,0,0} ,
                          {8,2,0,1,0,0,0,4,0} ,
                          {0,0,4,6,0,2,9,0,0} ,
                          {0,5,0,0,0,3,0,2,8} ,
                          {0,0,9,3,0,0,0,7,4} ,
                          {0,4,0,0,5,0,0,3,6} ,
                          {7,0,3,0,1,8,0,0,0} };

        boolean[][] staticValues = new boolean[9][9];
        problem.findStaticValues(table, staticValues);
        problem.solve(table, staticValues);
        problem.printTable(table);
    }

    public void findStaticValues(int[][] table, boolean[][] staticValues) {
        for(int row = 0; row < 9; row++) {
            for(int column = 0; column < 9; column++) {
                if(table[row][column] != 0) staticValues[row][column] = true;
                else staticValues[row][column] = false;
            }
        }
    }

    public void printTable(int[][] table) {
        for(int i=0; i<9; i++) {
            if(i%3 != 0) System.out.println();
            else System.out.println("===================================================");
            System.out.print("  |  ");
            for(int j=1; j<=9; j++) {
                if(j%3 != 0) System.out.print(table[i][j-1] + "    ");
                else System.out.print(table[i][j-1] + "  |  ");
            }
            System.out.println();
        }
        System.out.println("===================================================");
    }

    public int[][] solve(int[][] table, boolean[][] staticValues) {
        Problem problem = new Problem();
        for(int row = 0; row < 9; row++) {
            int count = 1;
            boolean forward = true;
            for(int column = 0; column < 9; column++) {
                if(staticValues[row][column] == true) {
                    if(!forward) {
                        if(column > 0) {
                            column -= 2;
                            count = table[row][column + 1] + 1;
                        } else if (column == 0) {
                            row -= 1;
                            column = 7;
                            count = table[row][column + 1] + 1;
                        }
                    }
                } else {
                    table[row][column] = count;
                    if(checkRow(row, count, table) && checkColumn(column, count, table) && checkSquare(row, column, count, table) && count <= 9) {
                        count = 1;
                        forward = true;
                    } else {
                        count++;
                        if(count > 9 && column > 0) {
                            table[row][column] = 0;
                            column -= 2;
                            count = table[row][column + 1] + 1;
                            forward = false;
                        } else if (count > 9 && column == 0) {
                            table[row][column] = 0;
                            row -= 1;
                            column = 7;
                            count = table[row][column + 1] + 1;
                            forward = false;
                        } else if (count <= 9) {
                            column -= 1;
                        }
                    }
        //                    problem.printTable(table);
                }
            }
        }
        return table;
    }
    public boolean checkRow(int row, int number, int[][] table) {
        boolean valid = true;
        int count = 0;
        for(int column = 0; column < 9; column++) {
            if(table[row][column] == number) {
                count++;
            }
            if(count == 2) {
                valid = false;
                break;
            }
        }
        return valid;
    }
    public boolean checkColumn(int column, int number, int[][] table) {
        boolean valid = true;
        int count = 0;
        for(int row = 0; row < 9; row++) {
            if(table[row][column] == number) {
                count++;
            }
            if(count == 2) {
                valid = false;
                break;
            }
        }
        return valid;
    }
    public boolean checkSquare(int row, int column, int number, int[][] table) {
        boolean valid = true;
        int count = 0;
        int upperRow = 0;
        int upperColumn = 0;
        for(int upperRowBound = 6; upperRowBound >= 0; upperRowBound-=3) {
            if(row >= upperRowBound) {
                upperRow = upperRowBound;
            }
        }
        for(int upperColumnBound = 6; upperColumnBound >= 0; upperColumnBound-=3) {
            if(column >= upperColumnBound) {
                upperColumn = upperColumnBound;
            }
        }
        for(int i = upperRow; i < upperRow+3; i++) {
            for (int j = upperColumn; j < upperColumn+3; j++) {
                if(table[i][j] == number) {
                    count++;
                }
                if(count == 2) {
                    valid = false;
                    break;
                }
            }
        }
        return valid;
    }
}
