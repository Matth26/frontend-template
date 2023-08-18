import { Sprite, Stage, Text } from '@pixi/react';
import { SCALE_MODES, Texture } from 'pixi.js';
import { useState } from 'react';
import groundTile from './assets/tiles/tile_009.png';
import waterTile1 from './assets/tiles/water/tile_104.png';
import waterTile2 from './assets/tiles/water/tile_105.png';
import waterTile3 from './assets/tiles/water/tile_106.png';
import waterTile4 from './assets/tiles/water/tile_107.png';
import waterTile5 from './assets/tiles/water/tile_108.png';

import Connection from './components/Connection';

const i_x = 1;
const i_y = 0.5;
const j_x = -1;
const j_y = 0.5;

const w = 32 * 2;
const h = 32 * 2;

const NUMBER_TILES = 16;

const WIDTH = 800;
const HEIGHT = 600;

const H_OFFSET = (HEIGHT - (NUMBER_TILES * h) / 2) / 2;

function to_screen_coordinate(tile: { x: number; y: number }) {
  return {
    x: tile.x * i_x * 0.5 * w + tile.y * j_x * 0.5 * w,
    y: tile.x * i_y * 0.5 * h + tile.y * j_y * 0.5 * h,
  };
}

function invert_matrix(a: number, b: number, c: number, d: number) {
  // Determinant
  const det = 1 / (a * d - b * c);

  return {
    a: det * d,
    b: det * -b,
    c: det * -c,
    d: det * a,
  };
}

function to_grid_coordinate(screen: { x: number; y: number }) {
  const a = i_x * 0.5 * w;
  const b = j_x * 0.5 * w;
  const c = i_y * 0.5 * h;
  const d = j_y * 0.5 * h;

  const inv = invert_matrix(a, b, c, d);

  return {
    x: screen.x * inv.a + screen.y * inv.b,
    y: screen.x * inv.c + screen.y * inv.d,
  };
}

const isWaterTile = (x: number, y: number) => {
  return x < 2 || y < 2 || x > NUMBER_TILES - 3 || y > NUMBER_TILES - 3;
};

function App() {
  const grid = Array.from({ length: NUMBER_TILES }, (_, x) =>
    Array.from({ length: NUMBER_TILES }, (_, y) => ({ x, y }))
  );

  const [selectedTile, setSelectedTile] = useState<
    undefined | { x: number; y: number }
  >(undefined);

  /*const VerticalLine = () => (
    <Graphics
      draw={(g) => {
        g.clear();
        g.lineStyle(1, 0xff0000, 1); // 2px width, red color, 1 alpha
        g.moveTo(250, 0);
        g.lineTo(250, 500);
      }}
    />
  );

  const HorizontalLine = () => (
    <Graphics
      draw={(g) => {
        g.clear();
        g.lineStyle(1, 0xff0000, 1); // 2px width, red color, 1 alpha
        g.moveTo(0, 250);
        g.lineTo(500, 250);
      }}
    />
  );
*/
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-end p-2">
        <Connection />
      </div>

      <div className="flex-grow mx-auto mt-10">
        {/*<Read />
        <Write />*/}
        <Stage
          width={WIDTH}
          height={HEIGHT}
          options={{ backgroundColor: '0xeef1f5' }}
          onPointerMove={(e) => {
            const gridPos = to_grid_coordinate({
              x: e.nativeEvent.offsetX - WIDTH / 2,
              y: e.nativeEvent.offsetY - H_OFFSET,
            });
            const tileX = Math.round(gridPos.x);
            const tileY = Math.round(gridPos.y);

            setSelectedTile({ x: tileX, y: tileY });
          }}
          onPointerDown={(e) => {
            const gridPos = to_grid_coordinate({
              x: e.nativeEvent.offsetX - WIDTH / 2,
              y: e.nativeEvent.offsetY - H_OFFSET,
            });
            const tileX = Math.round(gridPos.x);
            const tileY = Math.round(gridPos.y);
            if (tileX >= 0 && tileY >= 0)
              console.log('Click on tile: ' + tileX, tileY);
          }}
        >
          {grid.flatMap((row) =>
            row.map((tile) => {
              const screenPos = to_screen_coordinate(tile);
              const adjustment =
                selectedTile &&
                selectedTile.x === tile.x &&
                selectedTile.y === tile.y
                  ? 4
                  : 0;

              // Check if tile is on the border
              const isWater = isWaterTile(tile.x, tile.y);

              // Use water tile for border and your original tile for inside
              let tileImage = groundTile;
              if (isWater) {
                if (!isWaterTile(tile.x, tile.y - 1)) tileImage = waterTile2;
                else if (!isWaterTile(tile.x - 1, tile.y))
                  tileImage = waterTile3;
                else if (!isWaterTile(tile.x + 1, tile.y))
                  tileImage = waterTile4;
                else if (!isWaterTile(tile.x, tile.y + 1))
                  tileImage = waterTile5;
                else tileImage = waterTile1;
              }
              Texture.from(tileImage).baseTexture.scaleMode =
                SCALE_MODES.NEAREST;
              return (
                <>
                  <Sprite
                    key={`${tile.x}-${tile.y}`}
                    image={tileImage}
                    anchor={0.5}
                    scale={2}
                    x={screenPos.x + WIDTH / 2}
                    y={screenPos.y + H_OFFSET - adjustment}
                  />
                  {/*{!isWater && tile.x === 12 && tile.y === 5 && (
                    <Sprite
                      key={`${tile.x}-${tile.y}`}
                      image={obj53}
                      anchor={0.5}
                      scale={2}
                      x={screenPos.x + WIDTH / 2 + -2}
                      y={screenPos.y + H_OFFSET - 8 - adjustment}
                    />
                  )}*/}
                </>
              );
            })
          )}

          {selectedTile && (
            <Text
              key={`text-${selectedTile.x}-${selectedTile.y}`}
              text={`(${selectedTile.x}, ${selectedTile.y})`}
              x={50} // Adjust as needed
              y={50} // Adjust as needed
            />
          )}
          {/*<VerticalLine />
          <HorizontalLine />*/}
        </Stage>
      </div>

      <div className="text-center py-2">Made with love by Matthias</div>
    </div>
  );
}

export default App;
