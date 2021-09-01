rm -Rf CMakeFiles/ CMakeCache.txt
~/Dev/emscripten/emcmake cmake . -G Ninja
ninja
~/Dev/emscripten/emcc -O3 -o mams.html --preload-file data --pre-js pre.js -s TOTAL_MEMORY=33554432 -s "EXPORTED_FUNCTIONS=['_main', '_SDL_Quit', '_OneMainLoopIteration']" ./CMakeFiles/meandmyshadow.dir/src/*.o --use-preload-plugins -s "DEAD_FUNCTIONS=['_TTF_GlyphMetrics', '__Z12downloadFileRKNSt3__112basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEEP7__sFILE', '_SDL_GetKeyName', '_SDL_JoystickGetAxis', '_SDL_JoystickGetButton', '_SDL_JoystickGetHat', '_SDL_JoystickOpen', '_SDL_JoystickClose', '_TTF_Quit', '__Z11extractFileRKNSt3__112basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEES7_', '_SDL_SetColorKey', '_SDL_DisplayFormat', '', '', '', '', '']"

