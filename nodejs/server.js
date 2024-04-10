const serverConfig = (app, port) => {
  function start() {
    try {
      app.listen(port, () => console.log(`🚀 @ http://localhost:${port}`));
    } catch (error) {
      console.log(error);
    }
  }
  start();
};

module.exports = serverConfig;
