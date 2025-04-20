document.getElementById('myForm').addEventListener('keydown', function(event) {
    // ...existing code...
    if (event.key === 'Enter') {
        event.preventDefault(); // Empêche le comportement par défaut
        document.getElementById('myForm').dispatchEvent(new Event('submit')); // Déclenche la soumission
    }
});
// ...existing code...