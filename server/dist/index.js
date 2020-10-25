"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
const server = http_1.default.createServer(app);
server.listen(9000, () => console.log(`server started at http://localhost:9000`));
app.use(express_1.default.json());
app.use(cors_1.default());
app.get("/", (req, res) => {
    res.send("Hello world!");
});
routes_1.default(app, server);
//# sourceMappingURL=index.js.map