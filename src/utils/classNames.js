export default function classNames(cls, mods, additional) {
  const modClasses = Object.entries(mods)
    .filter(([className, value]) => Boolean(value))
    .map(([className]) => className);
  const classes = [cls, ...additional, ...modClasses];
  return classes.join(' ');
}

 