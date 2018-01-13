

fdescribe('RXJS', () => {
    fit('1 sb 1', () => {
        expect(1).toBe(1);
    });
});

fdescribe('promise', () => {

    fit('should resolve', () => {
        const prom = new Promise((resolve) => {
            resolve([1, 2, 3]);
        });

        prom.then((d) => {
            expect(d).toEqual([1, 2, 3]);
        });
    });

    fit('should chain', () => {
        const prom = new Promise((resolve) => {
            resolve([1, 2, 3]);
        });

        prom.then((d) => {
            expect(d).toEqual([1, 2, 3]);
            return 'it worked';
        }).then(d => {
            expect(d).toEqual('it worked');
        });
    });
});
