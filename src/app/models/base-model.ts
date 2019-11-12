export default abstract class BaseModel {
    initialize(srcObj?: any) {
        if (srcObj) {
            for (const key in this) {
                if (this.hasOwnProperty(key) && srcObj.hasOwnProperty(key)) {
                    this[key] = srcObj[key];
                }
            }
        }
    }
}
