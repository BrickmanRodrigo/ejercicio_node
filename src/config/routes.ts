import { AlumnosController } from "../controllers/alumnos.controller";
import { ClasesController } from "../controllers/clases.controller";
import { ProfesoresController } from "../controllers/profesores.controller";

export class Routes {
    public clasesController: ClasesController = new ClasesController();
    public profesoresController: ProfesoresController = new ProfesoresController();
    public alumnosController: AlumnosController = new AlumnosController();

    
    public routes(app): void {
        app.route("/alumnos")
        .get(this.alumnosController.getAll)
        .post(this.alumnosController.create);

        app.route("/alumnos/:id")
        .get(this.alumnosController.findById)
        .delete(this.alumnosController.delete);

        app.route("/alumnos/:id/clases")
        .get(this.alumnosController.findClasesById);

        
        app.route("/profes")
        .get(this.profesoresController.getAll)
        .post(this.profesoresController.create);

        app.route("/profes/:id")
        .get(this.profesoresController.findById)
        .delete(this.profesoresController.delete);


        app.route("/clases")
        .get(this.clasesController.getAll)
        .post(this.clasesController.create);

        app.route("/clases/:id")
        .get(this.clasesController.findById)
        .delete(this.clasesController.delete);

        app.route("/clases/:id/profe")
        .get(this.clasesController.findProfeById);


        app.route("/statistics")
        .get(this.profesoresController.getStatisticsByProfe)
    }
}