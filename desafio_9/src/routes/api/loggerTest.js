import { addLogger } from "../../utils/logger";

app.use(addLogger);

app.get("/", (req, res) => {
  res.send({ message: "¡Prueba de logger!" });
});
