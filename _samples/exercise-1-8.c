#include <stdio.h>
#include <stdbool.h>

bool xor(bool x, bool y) {
    return (x != y);
}

int main() {
    bool tests[4][3] = {
        { false, false, false },
        { false, true,  true },
        { true,  false, true },
        { true,  true,  false }
    };
    
    printf("x\ty\tq\n");
    for (int t = 0; t < 4; t++) {
        bool x = tests[t][0];
        bool y = tests[t][1];
        bool q = tests[t][2];
        bool test_q = xor(x, y);
        char *result = (q == test_q) ? "OK" : "Wrong"; 
        printf("%d\t%d\t%d == %d\t%s\n", x, y, q, test_q, result);
    }

    return 0;
}