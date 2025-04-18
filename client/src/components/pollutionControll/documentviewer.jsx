const SimplePDFViewer = ({ fileUrl }) => {
    return (
      <iframe
        src={fileUrl}
        title="Document Viewer"
        width="100%"
        height="600px"
        style={{ border: 'none' }}
      />
    );
  };


  export default SimplePDFViewer
  