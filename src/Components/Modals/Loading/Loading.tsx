import classes from "./Loading.module.css"

const Loader = () => {
    return (
        <section className={classes.loadingModal}>
            <div className={classes.spinner} />
        </section>
    );
}


export default Loader;
