const renderHomePage = (req, res, responseBody) => {
    res.render('index',
        {
            title: 'TaroTwit',
            pageHeader:{
                title: 'TaroTwit',
                strapLine: 'Your fortune from the collective energy of the internet.',
            },
            sidebar: 'sidebar',
        }
    );
};

module.exports = {
    renderHomePage
};
