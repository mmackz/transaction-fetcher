document.getElementById('result').style.display = 'none';
document.getElementById('copyButton').style.display = 'none';

document.getElementById('transactionForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const transactionHash = document.getElementById('transactionHash').value;
    const network = document.getElementById('network').value;

    try {
        const response = await fetch('/getTransactionData', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ transactionHash, network })
        });

        if (response.ok) {
            const data = await response.json();
            document.getElementById('result').textContent = JSON.stringify(data, null, 2);
            document.getElementById('result').style.display = 'block';
            document.getElementById('copyButton').style.display = 'block';
        } else {
            const errorText = await response.text();
            document.getElementById('result').textContent = errorText;
            document.getElementById('result').style.display = 'block';
            document.getElementById('copyButton').style.display = 'none'; 
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('result').textContent = 'An error occurred while fetching data.';
        document.getElementById('result').style.display = 'block';
        document.getElementById('copyButton').style.display = 'none';
    }
});

document.getElementById('copyButton').addEventListener('click', function() {
    const outputText = document.getElementById('result').textContent;
    navigator.clipboard.writeText(outputText)
        .then(() => {
            alert('Copied to clipboard!');
        })
        .catch(err => {
            console.error('Error in copying text: ', err);
        });
});