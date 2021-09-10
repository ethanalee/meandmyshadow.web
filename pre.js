
Module['noExitRuntime'] = true;
Module['postRun'] = function() {
  var O_RDONLY = 0;
  var O_WRONLY = 1;
  var O_RDWR = 2;
  var O_CREAT = 64;
  var O_EXCL = 128;
  var O_TRUNC = 512;
  var O_APPEND = 1024;
  var O_ACCMODE = 2097155;

  FS.trackingDelegate['willMovePath'] = function(oldpath, newpath) {
    out('About to move "' + oldpath + '" to "' + newpath + '"');
  };
  FS.trackingDelegate['onMovePath'] = function(oldpath, newpath) {
    out('Moved "' + oldpath + '" to "' + newpath + '"');
  };
  FS.trackingDelegate['willDeletePath'] = function(path) {
    out('About to delete "' + path + '"');
  };
  FS.trackingDelegate['onDeletePath'] = function(path) {
    out('Deleted "' + path + '"');
  };
  FS.trackingDelegate['onOpenFile'] = function(path, flags) {
    var stat = FS.stat(path);
    var fileSize = stat.size;
    var trackingFlags = [];

    if (flags & O_CREAT) {
      trackingFlags.push('O_CREAT');
    }
    if (flags & O_TRUNC) {
      trackingFlags.push('O_TRUNC');
    }
    if (flags & O_APPEND) {
      trackingFlags.push('O_APPEND');
    }
    if (flags & O_EXCL) {
      trackingFlags.push('O_EXCL');
    }
    // The argument flags must include one of the following access
    // modes: O_RDONLY, O_WRONLY, or O_RDWR.  These request opening the
    // file read-only, write-only, or read/write, respectively.
    // https://man7.org/linux/man-pages/man2/open.2.html
    if ((flags & O_ACCMODE) == O_WRONLY) {
      trackingFlags.push('O_WRONLY');
    }
    if ((flags & O_ACCMODE) == O_RDWR) {
      trackingFlags.push('O_RDWR');
    }
    if ((flags & O_ACCMODE) == O_RDONLY) {
      trackingFlags.push('O_RDONLY');
    }
    var output = 'Opened "' + path + '" with flags ';
    for (var i = 0; i < trackingFlags.length; i++) {
      output += trackingFlags[i] + ' ';
    }
    output += 'and file size ' + fileSize;
    out(output)
  };
  FS.trackingDelegate['onReadFile'] = function(path, bytesRead) {
    out('Read ' + bytesRead + ' bytes from "' + path + '"');
  };
  FS.trackingDelegate['onWriteToFile'] = function(path, bytesWritten) {
    out('Wrote to file "' + path + '" with ' + bytesWritten + ' bytes written');
  };
  FS.trackingDelegate['onSeekFile'] = function(path, position, whence) {
    out('Seek on "' + path + '" with position ' + position + ' and whence ' + whence);
  };
  FS.trackingDelegate['onCloseFile'] = function(path) {
    out('Closed ' + path);
  };
  FS.trackingDelegate['onMakeDirectory'] = function(path, mode) {
    out('Created directory "' + path + '" with mode ' + mode);
  };
  FS.trackingDelegate['onMakeSymlink'] = function(oldpath, newpath) {
    out('Created symlink from "' + oldpath + '" to "' + newpath + '"');
  };
  function doOne() {
    //console.log('zz doOne ' + Date.now());
    Module['_OneMainLoopIteration']();
    setTimeout(doOne, 1000/40); // Game expects to run at 40fps
  }
  doOne();
};

